"use client";

import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  Typography,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableContainer,
  Paper,
  CircularProgress,
  Box,
  IconButton,
} from "@mui/material";
import {
  AddCircleOutline as PlusCircleIcon,
  Edit as EditIcon,
  Delete as Trash2Icon,
  ArrowUpward as ArrowUpwardIcon,
  ArrowDownward as ArrowDownwardIcon,
} from "@mui/icons-material";
import { showSuccess, showError } from "@/utils/toast";
import {
  createTheme,
  ThemeProvider as MuiThemeProvider,
} from "@mui/material/styles";
import { supabase } from "@/integrations/supabase/client";
import ImageUpload from "@/app/components/admin/ImageUpload";
import { v4 as uuidv4 } from "uuid";

interface Member {
  id: string;
  name: string;
  function: string;
  image?: string;
  created_at: string;
  user_id: string;
  display_order: number;
}

const BACKGROUND_DEFAULT = "#2b2f3d";
const BACKGROUND_PAPER = "#485164";
const TEXT_PRIMARY = "#ffffffff";
const TEXT_SECONDARY = "#a0a0a0";
const HOVER_BG = "#414857ff";
const PRIMARY_MAIN = "#181c2c";
const BORDER_COLOR = "#3c485c";

const muiTheme = createTheme({
  typography: {
    fontFamily: '"Montserrat", sans-serif',
  },
  palette: {
    mode: "dark",
    background: {
      default: BACKGROUND_DEFAULT,
      paper: BACKGROUND_PAPER,
    },
    primary: {
      main: PRIMARY_MAIN,
    },
    error: {
      main: "#ff6b6b",
    },
    text: {
      primary: TEXT_PRIMARY,
      secondary: TEXT_SECONDARY,
    },
  },
  components: {
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          color: TEXT_PRIMARY,
          "& .MuiOutlinedInput-notchedOutline": {
            borderColor: TEXT_SECONDARY,
          },
          "&:hover .MuiOutlinedInput-notchedOutline": {
            borderColor: TEXT_SECONDARY,
          },
          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: PRIMARY_MAIN,
          },
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          color: TEXT_PRIMARY,
          "&.Mui-focused": {
            color: TEXT_PRIMARY,
          },
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        root: {
          color: TEXT_PRIMARY,
          borderColor: BORDER_COLOR,
        },
        head: {
          backgroundColor: BACKGROUND_DEFAULT,
          color: TEXT_PRIMARY,
        },
      },
    },
    MuiDialog: {
      styleOverrides: {
        paper: {
          backgroundColor: BACKGROUND_PAPER,
          color: TEXT_PRIMARY,
        },
      },
    },
    MuiDialogActions: {
      styleOverrides: {
        root: {
          backgroundColor: "#666e7e",
        },
      },
    },
    MuiDialogTitle: {
      styleOverrides: {
        root: {
          backgroundColor: "#666e7e",
        },
      },
    },
  },
});

const MembersPage = () => {
  const [members, setMembers] = useState<Member[]>([]);
  const [loading, setLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingMember, setEditingMember] = useState<Member | null>(null);
  const [newMemberData, setNewMemberData] = useState<
    Omit<Member, "id" | "created_at" | "user_id" | "display_order"> & { id?: string }
  >({ name: "", function: "", image: "" });
  const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false);
  const [memberToDeleteId, setMemberToDeleteId] = useState<string | null>(null);
  const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({});

  const [selectedNewFiles, setSelectedNewFiles] = useState<File[]>([]);
  const [currentImageUrlsForUpload, setCurrentImageUrlsForUpload] = useState<
    string[]
  >([]);

  const fetchMembers = async () => {
    setLoading(true);
    const { data: user, error: userError } = await supabase.auth.getUser();
    if (userError || !user?.user) {
      showError("Você precisa estar logado para ver os membros.");
      setLoading(false);
      return;
    }

    const { data, error } = await supabase
      .from("members")
      .select("*")
      .order("display_order", { ascending: true });

    if (error) {
      showError("Erro ao buscar membros: " + error.message);
    } else {
      setMembers(data as Member[]);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchMembers();
  }, []);

  const validateForm = () => {
    const errors: { [key: string]: string } = {};
    if (!newMemberData.name.trim()) {
      errors.name = "O nome do membro é obrigatório.";
    }
    if (!newMemberData.function.trim()) {
      errors.function = "A função do membro é obrigatória.";
    }
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const uploadImage = async (file: File, userId: string): Promise<string | null> => {
    const fileExtension = file.name.split(".").pop();
    const fileName = `${uuidv4()}.${fileExtension}`;
    const filePath = `${userId}/${fileName}`;

    const { data, error } = await supabase.storage
      .from("member-images")
      .upload(filePath, file, {
        cacheControl: "3600",
        upsert: false,
      });

    if (error) {
      showError("Erro ao fazer upload da imagem: " + error.message);
      return null;
    }

    const { data: publicUrlData } = supabase.storage
      .from("member-images")
      .getPublicUrl(filePath);

    return publicUrlData.publicUrl;
  };

  const handleAddOrUpdateMember = async () => {
    if (!validateForm()) {
      showError("Por favor, preencha todos os campos obrigatórios.");
      return;
    }

    const { data: user, error: userError } = await supabase.auth.getUser();
    if (userError || !user?.user) {
      showError("Você precisa estar logado para adicionar/editar membros.");
      return;
    }

    let imageUrl: string | null = newMemberData.image || null;

    if (selectedNewFiles.length > 0) {
      const uploadedUrl = await uploadImage(selectedNewFiles[0], user.user.id);
      if (uploadedUrl) {
        imageUrl = uploadedUrl;
      } else {
        return;
      }
    } else if (currentImageUrlsForUpload.length > 0) {
      imageUrl = currentImageUrlsForUpload[0];
    } else {
      imageUrl = null;
    }

    if (editingMember) {
      const { error } = await supabase
        .from("members")
        .update({
          name: newMemberData.name,
          function: newMemberData.function,
          image: imageUrl,
        })
        .eq("id", editingMember.id);

      if (error) {
        showError("Erro ao atualizar membro: " + error.message);
      } else {
        showSuccess("Membro atualizado com sucesso!");
        fetchMembers();
      }
    } else {
      const { data: maxOrderData, error: maxOrderError } = await supabase
        .from('members')
        .select('display_order')
        .order('display_order', { ascending: false })
        .limit(1)
        .single();

      if (maxOrderError && maxOrderError.code !== 'PGRST116') {
        showError("Erro ao determinar a ordem do novo membro.");
        return;
      }

      const newOrder = (maxOrderData?.display_order || 0) + 1;

      const { error } = await supabase.from("members").insert({
        user_id: user.user.id,
        name: newMemberData.name,
        function: newMemberData.function,
        image: imageUrl,
        display_order: newOrder,
      });

      if (error) {
        showError("Erro ao adicionar membro: " + error.message);
      } else {
        showSuccess("Membro adicionado com sucesso!");
        fetchMembers();
      }
    }
    setIsDialogOpen(false);
    setEditingMember(null);
    setNewMemberData({ name: "", function: "", image: "" });
    setSelectedNewFiles([]);
    setCurrentImageUrlsForUpload([]);
    setFormErrors({});
  };

  const handleEditClick = (member: Member) => {
    setEditingMember(member);
    setNewMemberData({
      name: member.name,
      function: member.function,
      image: member.image || "",
    });
    setCurrentImageUrlsForUpload(member.image ? [member.image] : []);
    setSelectedNewFiles([]);
    setFormErrors({});
    setIsDialogOpen(true);
  };

  const confirmDelete = (id: string) => {
    setMemberToDeleteId(id);
    setIsConfirmDialogOpen(true);
  };

  const handleDeleteConfirmed = async () => {
    if (memberToDeleteId) {
      const { data: user, error: userError } = await supabase.auth.getUser();
      if (userError || !user?.user) {
        showError("Você precisa estar logado para excluir membros.");
        return;
      }

      const memberToDelete = members.find(m => m.id === memberToDeleteId);
      if (memberToDelete?.image) {
        const filePath = memberToDelete.image.split('/').slice(-2).join('/');
        const { error: deleteImageError } = await supabase.storage
          .from('member-images')
          .remove([filePath]);
        if (deleteImageError) {
          console.error("Erro ao excluir imagem do storage:", deleteImageError.message);
        }
      }

      const { error } = await supabase
        .from("members")
        .delete()
        .eq("id", memberToDeleteId);

      if (error) {
        showError("Erro ao excluir membro: " + error.message);
      } else {
        showSuccess("Membro excluído com sucesso!");
        fetchMembers();
      }
      setMemberToDeleteId(null);
      setIsConfirmDialogOpen(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setNewMemberData((prev) => ({ ...prev, [id]: value }));
    setFormErrors(prev => ({ ...prev, [id]: "" }));
  };

  const handleMove = async (memberId: string, direction: 'up' | 'down') => {
    const memberIndex = members.findIndex(m => m.id === memberId);
    if (memberIndex === -1) return;

    const member = members[memberIndex];
    const neighborIndex = direction === 'up' ? memberIndex - 1 : memberIndex + 1;

    if (neighborIndex < 0 || neighborIndex >= members.length) return;

    const neighbor = members[neighborIndex];

    const { error: memberUpdateError } = await supabase
      .from('members')
      .update({ display_order: neighbor.display_order })
      .eq('id', member.id);

    const { error: neighborUpdateError } = await supabase
      .from('members')
      .update({ display_order: member.display_order })
      .eq('id', neighbor.id);

    if (memberUpdateError || neighborUpdateError) {
      showError("Erro ao reordenar membro.");
    } else {
      showSuccess("Membro reordenado.");
      fetchMembers();
    }
  };

  return (
    <MuiThemeProvider theme={muiTheme}>
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <Typography
            variant="h5"
            component="h1"
            fontWeight="semibold"
            color="text.primary"
          >
            Gerenciar Membros
          </Typography>
          <Button
            variant="contained"
            startIcon={<PlusCircleIcon />}
            onClick={() => {
              setEditingMember(null);
              setNewMemberData({ name: "", function: "", image: "" });
              setSelectedNewFiles([]);
              setCurrentImageUrlsForUpload([]);
              setFormErrors({});
              setIsDialogOpen(true);
            }}
            sx={{
              bgcolor: BACKGROUND_PAPER,
              color: TEXT_PRIMARY,
              "&:hover": {
                bgcolor: HOVER_BG,
              },
            }}
          >
            Adicionar Membro
          </Button>

          <Dialog open={isDialogOpen} onClose={() => {setIsDialogOpen(false); setFormErrors({});}}>
            <DialogTitle color="text.primary" sx={{ bgcolor: "#666e7e" }}>
              {editingMember ? "Editar Membro" : "Adicionar Novo Membro"}
            </DialogTitle>

            <DialogContent>
              <DialogContentText color="text.primary">
                Preencha os detalhes do membro aqui. Clique em salvar quando
                terminar.
              </DialogContentText>
              <TextField
                autoFocus
                margin="dense"
                id="name"
                label="Nome"
                type="text"
                fullWidth
                variant="outlined"
                value={newMemberData.name}
                onChange={handleInputChange}
                sx={{ mt: 2 }}
                error={!!formErrors.name}
                helperText={formErrors.name}
              />
              <TextField
                margin="dense"
                id="function"
                label="Função"
                type="text"
                fullWidth
                variant="outlined"
                value={newMemberData.function}
                onChange={handleInputChange}
                sx={{ mt: 2 }}
                error={!!formErrors.function}
                helperText={formErrors.function}
              />
              <ImageUpload
                label="Imagem do Membro"
                initialImageUrls={currentImageUrlsForUpload}
                onImageUrlsChange={setCurrentImageUrlsForUpload}
                onNewFilesChange={setSelectedNewFiles}
                multiple={false}
              />
            </DialogContent>

            <DialogActions sx={{ bgcolor: "#666e7e" }}>
              <Button
                onClick={() => {setIsDialogOpen(false); setFormErrors({});}}
                color="inherit"
                sx={{ color: TEXT_PRIMARY }}
              >
                Cancelar
              </Button>
              <Button
                onClick={handleAddOrUpdateMember}
                variant="contained"
                sx={{
                  bgcolor: BACKGROUND_PAPER,
                  color: TEXT_PRIMARY,
                  "&:hover": {
                    bgcolor: HOVER_BG,
                  },
                }}
              >
                {editingMember ? "Salvar Alterações" : "Adicionar Membro"}
              </Button>
            </DialogActions>
          </Dialog>
        </div>

        <Card sx={{ bgcolor: BACKGROUND_PAPER, color: TEXT_PRIMARY }}>
          <CardHeader
            title={
              <Typography variant="h6" color="text.primary">
                Lista de Membros
              </Typography>
            }
          />
          <CardContent>
            {loading ? (
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  minHeight: 200,
                }}
              >
                <CircularProgress sx={{ color: TEXT_PRIMARY }} />
              </Box>
            ) : members.length === 0 ? (
              <Typography color="text.secondary">
                Nenhum membro encontrado.
              </Typography>
            ) : (
              <TableContainer
                component={Paper}
                sx={{
                  backgroundColor: BACKGROUND_PAPER,
                  color: TEXT_PRIMARY,
                  boxShadow: "none",
                  border: `1px solid ${BORDER_COLOR}`,
                }}
              >
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Ordem</TableCell>
                      <TableCell>Nome</TableCell>
                      <TableCell>Função</TableCell>
                      <TableCell>Data de Entrada</TableCell>
                      <TableCell align="right">Ações</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {members.map((member, index) => (
                      <TableRow
                        key={member.id}
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                          "&:hover": {
                            backgroundColor: HOVER_BG,
                            "& .MuiTableCell-root": { color: TEXT_PRIMARY },
                          },
                        }}
                      >
                        <TableCell>
                          <IconButton onClick={() => handleMove(member.id, 'up')} disabled={index === 0} size="small">
                            <ArrowUpwardIcon fontSize="inherit" />
                          </IconButton>
                          <IconButton onClick={() => handleMove(member.id, 'down')} disabled={index === members.length - 1} size="small">
                            <ArrowDownwardIcon fontSize="inherit" />
                          </IconButton>
                        </TableCell>
                        <TableCell component="th" scope="row">
                          {member.name}
                        </TableCell>
                        <TableCell>{member.function}</TableCell>
                        <TableCell>
                          {new Date(member.created_at).toLocaleDateString()}
                        </TableCell>
                        <TableCell align="right">
                          <Button
                            variant="text"
                            size="small"
                            onClick={() => handleEditClick(member)}
                            sx={{ minWidth: "auto", p: 1, color: TEXT_PRIMARY }}
                          >
                            <EditIcon fontSize="small" />
                          </Button>
                          <Button
                            variant="text"
                            size="small"
                            onClick={() => confirmDelete(member.id)}
                            color="error"
                            sx={{ minWidth: "auto", p: 1, ml: 1 }}
                          >
                            <Trash2Icon fontSize="small" />
                          </Button>
                          <Dialog
                            open={
                              isConfirmDialogOpen &&
                              memberToDeleteId === member.id
                            }
                            onClose={() => setIsConfirmDialogOpen(false)}
                            aria-labelledby="alert-dialog-title"
                            aria-describedby="alert-dialog-description"
                          >
                            <DialogTitle id="alert-dialog-title" color="text.primary" sx={{ bgcolor: "#666e7e" }}>
                              {"Tem certeza?"}
                            </DialogTitle>
                            <DialogContent>
                              <DialogContentText
                                id="alert-dialog-description"
                                color="text.secondary"
                              >
                                Esta ação não pode ser desfeita. Isso excluirá
                                permanentemente o membro.
                              </DialogContentText>
                            </DialogContent>
                            <DialogActions sx={{ bgcolor: "#666e7e" }}>
                              <Button
                                onClick={() => setIsConfirmDialogOpen(false)}
                                color="inherit"
                                sx={{ color: TEXT_SECONDARY }}
                              >
                                Cancelar
                              </Button>
                              <Button
                                onClick={handleDeleteConfirmed}
                                autoFocus
                                variant="contained"
                                color="error"
                              >
                                Continuar
                              </Button>
                            </DialogActions>
                          </Dialog>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            )}
          </CardContent>
        </Card>
      </div>
    </MuiThemeProvider>
  );
};

export default MembersPage;