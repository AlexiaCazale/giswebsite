"use client";

import React, { ChangeEvent, useState, useEffect } from "react";
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
  SelectChangeEvent,
  Box,
} from "@mui/material";
import {
  AddCircleOutline as PlusCircleIcon,
  Edit as EditIcon,
  Delete as Trash2Icon,
} from "@mui/icons-material";
import { showSuccess, showError } from "@/utils/toast";
import { supabase } from "@/integrations/supabase/client";
import {
  createTheme,
  ThemeProvider as MuiThemeProvider,
} from "@mui/material/styles";
import ImageUpload from "@/app/components/admin/ImageUpload"; // Importar o novo componente
import { v4 as uuidv4 } from "uuid"; // Importar uuid para nomes de arquivos únicos

// Interface para Projetos (ajustada para o novo esquema do DB)
interface ProjectItem {
  id: string;
  name: string;
  description?: string;
  date: string;
  cover_image?: string; // Nova coluna para imagem de capa
  images?: string; // JSON string of string[] para galeria
  created_at: string;
  user_id: string;
}

// Definição manual das cores para TEMA ESCURO SUAVE (match AdminLayout/Dashboard)
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
      main: "#ff6b6b", // Vermelho de erro
    },
    text: {
      primary: TEXT_PRIMARY,
      secondary: TEXT_SECONDARY,
    },
  },
  components: {
    // Estilos para harmonizar os inputs com o tema escuro suave
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          color: TEXT_PRIMARY,
          '& .MuiOutlinedInput-notchedOutline': {
            borderColor: TEXT_SECONDARY, // Borda sutil
          },
          '&:hover .MuiOutlinedInput-notchedOutline': {
            borderColor: TEXT_SECONDARY,
          },
          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor: PRIMARY_MAIN, // Foco na cor primária
          },
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          color: TEXT_PRIMARY,
          '&.Mui-focused': {
            color: TEXT_PRIMARY, 
          }
        }
      }
    },
    // Estilos para harmonizar a tabela
    MuiTableCell: {
      styleOverrides: {
        root: {
          color: TEXT_PRIMARY,
          borderColor: BORDER_COLOR, // Linha de grade mais suave
        },
        head: {
          backgroundColor: BACKGROUND_DEFAULT, // Cabeçalho da tabela com o fundo de hover
          color: TEXT_PRIMARY,
        }
      }
    },
    // Estilos para harmonizar o diálogo/modal
    MuiDialog: {
      styleOverrides: {
        paper: {
          backgroundColor: BACKGROUND_PAPER, 
          color: TEXT_PRIMARY,
        }
      }
    },
    // Definir cor de fundo dos botões de Dialog (usamos aqui para consistência)
    MuiDialogActions: {
        styleOverrides: {
            root: {
                backgroundColor: "#666e7e",
            }
        }
    },
    MuiDialogTitle: {
        styleOverrides: {
            root: {
                backgroundColor: "#666e7e",
            }
        }
    }
  }
});


const ProjectsPage = () => {
  const [projects, setProjects] = useState<ProjectItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<ProjectItem | null>(null);
  const [newProjectData, setNewProjectData] = useState<Omit<ProjectItem, "id" | "created_at" | "user_id"> & { id?: string }>(
    { name: "", description: "", date: "", cover_image: "", images: "" }
  );
  const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false);
  const [projectToDeleteId, setProjectToDeleteId] = useState<string | null>(null);
  const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({}); // Estado para erros do formulário

  // Estados para o ImageUpload da capa
  const [selectedNewCoverFile, setSelectedNewCoverFile] = useState<File[]>([]);
  const [currentCoverImageUrlForUpload, setCurrentCoverImageUrlForUpload] = useState<string[]>([]);

  // Estados para o ImageUpload da galeria
  const [selectedNewGalleryFiles, setSelectedNewGalleryFiles] = useState<File[]>([]);
  const [currentGalleryImageUrlsForUpload, setCurrentGalleryImageUrlsForUpload] = useState<string[]>([]);

  const fetchProjects = async () => {
    setLoading(true);
    const { data: user, error: userError } = await supabase.auth.getUser();
    if (userError || !user?.user) {
      showError("Você precisa estar logado para ver os projetos.");
      setLoading(false);
      return;
    }

    const { data, error } = await supabase
      .from("projects")
      .select("*")
      .eq("user_id", user.user.id)
      .order("created_at", { ascending: false });

    if (error) {
      showError("Erro ao buscar projetos: " + error.message);
    } else {
      setProjects(data as ProjectItem[]);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  // Função de validação
  const validateForm = () => {
    const errors: { [key: string]: string } = {};
    if (!newProjectData.name.trim()) {
      errors.name = "O nome do projeto é obrigatório.";
    }
    if (!newProjectData.description?.trim()) {
      errors.description = "A descrição do projeto é obrigatória.";
    }
    if (!newProjectData.date) {
      errors.date = "A data do projeto é obrigatória.";
    }
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const uploadImage = async (file: File, userId: string, bucketName: string): Promise<string | null> => {
    const fileExtension = file.name.split(".").pop();
    const fileName = `${uuidv4()}.${fileExtension}`;
    const filePath = `${userId}/${fileName}`; // Pasta por user_id

    const { data, error } = await supabase.storage
      .from(bucketName)
      .upload(filePath, file, {
        cacheControl: "3600",
        upsert: false,
      });

    if (error) {
      showError("Erro ao fazer upload da imagem: " + error.message);
      return null;
    }

    const { data: publicUrlData } = supabase.storage
      .from(bucketName)
      .getPublicUrl(filePath);

    return publicUrlData.publicUrl;
  };

  const deleteImageFromStorage = async (imageUrl: string, bucketName: string) => {
    if (!imageUrl) return;
    try {
      const parts = imageUrl.split('/');
      const filePath = parts.slice(parts.length - 2).join('/'); // Extrai 'user_id/filename.ext'
      const { error } = await supabase.storage
        .from(bucketName)
        .remove([filePath]);
      if (error) {
        console.error(`Erro ao excluir imagem do bucket ${bucketName}:`, error.message);
      }
    } catch (e) {
      console.error("Erro ao parsear URL da imagem para exclusão:", e);
    }
  };

  const handleAddOrUpdateProject = async () => {
    if (!validateForm()) {
      showError("Por favor, preencha todos os campos obrigatórios.");
      return;
    }

    const { data: user, error: userError } = await supabase.auth.getUser();
    if (userError || !user?.user) {
      showError("Você precisa estar logado para adicionar/editar projetos.");
      return;
    }

    // --- Lógica para Imagem de Capa ---
    let finalCoverImageUrl: string | null = newProjectData.cover_image || null;
    if (selectedNewCoverFile.length > 0) {
      // Se um novo arquivo de capa foi selecionado, faça o upload
      const uploadedUrl = await uploadImage(selectedNewCoverFile[0], user.user.id, "project-cover-images");
      if (uploadedUrl) {
        // Se havia uma imagem de capa antiga e uma nova foi carregada, exclua a antiga
        if (editingProject?.cover_image && editingProject.cover_image !== uploadedUrl) {
          await deleteImageFromStorage(editingProject.cover_image, "project-cover-images");
        }
        finalCoverImageUrl = uploadedUrl;
      } else {
        return; // Falha no upload da capa
      }
    } else if (currentCoverImageUrlForUpload.length === 0 && editingProject?.cover_image) {
      // Se a imagem de capa existente foi removida (currentCoverImageUrlForUpload está vazio)
      await deleteImageFromStorage(editingProject.cover_image, "project-cover-images");
      finalCoverImageUrl = null;
    } else if (currentCoverImageUrlForUpload.length > 0) {
      // Se a imagem de capa existente foi mantida
      finalCoverImageUrl = currentCoverImageUrlForUpload[0];
    } else {
      finalCoverImageUrl = null;
    }


    // --- Lógica para Imagens da Galeria ---
    let finalGalleryImageUrls: string[] = [...currentGalleryImageUrlsForUpload];
    for (const file of selectedNewGalleryFiles) {
      const uploadedUrl = await uploadImage(file, user.user.id, "project-gallery-images");
      if (uploadedUrl) {
        finalGalleryImageUrls.push(uploadedUrl);
      } else {
        return; // Falha no upload da galeria
      }
    }

    // Identificar imagens da galeria que foram removidas
    const oldGalleryUrls: string[] = editingProject?.images ? JSON.parse(editingProject.images) : [];
    const removedGalleryUrls = oldGalleryUrls.filter(url => !finalGalleryImageUrls.includes(url));
    for (const url of removedGalleryUrls) {
      await deleteImageFromStorage(url, "project-gallery-images");
    }

    const imagesJsonString = JSON.stringify(finalGalleryImageUrls);

    if (editingProject) {
      const { error } = await supabase
        .from("projects")
        .update({
          name: newProjectData.name,
          description: newProjectData.description,
          date: newProjectData.date,
          cover_image: finalCoverImageUrl, // Atualiza a capa
          images: imagesJsonString, // Atualiza a galeria
        })
        .eq("id", editingProject.id)
        .eq("user_id", user.user.id);

      if (error) {
        showError("Erro ao atualizar projeto: " + error.message);
      } else {
        showSuccess("Projeto atualizado com sucesso!");
        fetchProjects();
      }
    } else {
      const { error } = await supabase.from("projects").insert({
        user_id: user.user.id,
        name: newProjectData.name,
        description: newProjectData.description,
        date: newProjectData.date,
        cover_image: finalCoverImageUrl, // Insere a capa
        images: imagesJsonString, // Insere a galeria
      });

      if (error) {
        showError("Erro ao adicionar projeto: " + error.message);
      } else {
        showSuccess("Projeto adicionado com sucesso!");
        fetchProjects();
      }
    }
    setIsDialogOpen(false);
    setEditingProject(null);
    setNewProjectData({ name: "", description: "", date: "", cover_image: "", images: "" });
    setSelectedNewCoverFile([]);
    setCurrentCoverImageUrlForUpload([]);
    setSelectedNewGalleryFiles([]);
    setCurrentGalleryImageUrlsForUpload([]);
    setFormErrors({}); // Limpar erros do formulário
  };

  const handleEditClick = (project: ProjectItem) => {
    setEditingProject(project);
    setNewProjectData({
      name: project.name,
      description: project.description || "",
      date: project.date,
      cover_image: project.cover_image || "",
      images: project.images || "",
    });
    // Preencher o ImageUpload da capa
    setCurrentCoverImageUrlForUpload(project.cover_image ? [project.cover_image] : []);
    setSelectedNewCoverFile([]);

    // Preencher o ImageUpload da galeria
    try {
      const existingGalleryUrls = project.images ? JSON.parse(project.images) : [];
      setCurrentGalleryImageUrlsForUpload(existingGalleryUrls);
    } catch (e) {
      console.error("Erro ao parsear URLs de imagem da galeria existentes:", e);
      setCurrentGalleryImageUrlsForUpload([]);
    }
    setSelectedNewGalleryFiles([]);
    setFormErrors({}); // Limpar erros do formulário
    setIsDialogOpen(true);
  };

  const confirmDelete = (id: string) => {
    setProjectToDeleteId(id);
    setIsConfirmDialogOpen(true);
  };

  const handleDeleteConfirmed = async () => {
    if (projectToDeleteId) {
      const { data: user, error: userError } = await supabase.auth.getUser();
      if (userError || !user?.user) {
        showError("Você precisa estar logado para excluir projetos.");
        return;
      }

      const projectToDelete = projects.find(p => p.id === projectToDeleteId);
      if (projectToDelete) {
        // Excluir imagem de capa do storage
        if (projectToDelete.cover_image) {
          await deleteImageFromStorage(projectToDelete.cover_image, "project-cover-images");
        }
        // Excluir imagens da galeria do storage
        if (projectToDelete.images) {
          try {
            const imageUrls: string[] = JSON.parse(projectToDelete.images);
            for (const url of imageUrls) {
              await deleteImageFromStorage(url, "project-gallery-images");
            }
          } catch (e) {
            console.error("Erro ao parsear URLs de imagem da galeria para exclusão:", e);
          }
        }
      }

      const { error } = await supabase
        .from("projects")
        .delete()
        .eq("id", projectToDeleteId)
        .eq("user_id", user.user.id);

      if (error) {
        showError("Erro ao excluir projeto: " + error.message);
      } else {
        showSuccess("Projeto excluído com sucesso!");
        fetchProjects();
      }
      setProjectToDeleteId(null);
      setIsConfirmDialogOpen(false);
    }
  };

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | SelectChangeEvent<string>
  ) => {
    const { name, value } = e.target;
    setNewProjectData(prev => ({
      ...prev,
      [name as string]: value,
    }));
    // Limpar erro específico ao digitar
    setFormErrors(prev => ({ ...prev, [name as string]: "" }));
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
            Gerenciar Projetos
          </Typography>
          <Button
            variant="contained"
            startIcon={<PlusCircleIcon />}
            onClick={() => {
              setEditingProject(null);
              setNewProjectData({ name: "", description: "", date: "", cover_image: "", images: "" });
              setSelectedNewCoverFile([]);
              setCurrentCoverImageUrlForUpload([]);
              setSelectedNewGalleryFiles([]);
              setCurrentGalleryImageUrlsForUpload([]);
              setFormErrors({}); // Limpar erros do formulário
              setIsDialogOpen(true);
            }}
            sx={{
                bgcolor: HOVER_BG, 
                color: TEXT_PRIMARY,
                '&:hover': {
                    bgcolor: BORDER_COLOR, 
                },
            }}
          >
            Adicionar Projeto
          </Button>

          <Dialog open={isDialogOpen} onClose={() => {setIsDialogOpen(false); setFormErrors({});}}>
            <DialogTitle color="text.primary" sx={{ bgcolor: "#666e7e" }}>
                {editingProject ? "Editar Projeto" : "Adicionar Novo Projeto"}
            </DialogTitle>
            <DialogContent>
              <DialogContentText color="text.primary">
                Preencha os detalhes do projeto aqui. Clique em salvar quando terminar.
              </DialogContentText>
              <TextField
                autoFocus
                margin="dense"
                id="name"
                label="Nome"
                name="name"
                type="text"
                fullWidth
                variant="outlined"
                value={newProjectData.name}
                onChange={handleInputChange}
                sx={{ mt: 2 }}
                error={!!formErrors.name}
                helperText={formErrors.name}
              />
              <TextField
                margin="dense"
                id="description"
                label="Descrição"
                name="description"
                multiline
                rows={3}
                fullWidth
                variant="outlined"
                value={newProjectData.description}
                onChange={handleInputChange}
                sx={{ mt: 2 }}
                error={!!formErrors.description}
                helperText={formErrors.description}
              />
              <TextField
                margin="dense"
                id="date"
                label="Data do Projeto"
                name="date"
                type="date"
                fullWidth
                variant="outlined"
                InputLabelProps={{ shrink: true }}
                value={newProjectData.date}
                onChange={handleInputChange}
                sx={{ mt: 2 }}
                error={!!formErrors.date}
                helperText={formErrors.date}
              />
              {/* Componente ImageUpload para a imagem de capa (single) */}
              <ImageUpload
                label="Imagem de Capa do Projeto"
                initialImageUrls={currentCoverImageUrlForUpload}
                onImageUrlsChange={setCurrentCoverImageUrlForUpload}
                onNewFilesChange={setSelectedNewCoverFile}
                multiple={false} // Apenas uma imagem para capa
              />
              {/* Componente ImageUpload para as imagens da galeria (multiple) */}
              <ImageUpload
                label="Imagens da Galeria do Projeto"
                initialImageUrls={currentGalleryImageUrlsForUpload}
                onImageUrlsChange={setCurrentGalleryImageUrlsForUpload}
                onNewFilesChange={setSelectedNewGalleryFiles}
                multiple={true} // Permitir múltiplas imagens
              />
            </DialogContent>
            <DialogActions sx={{ bgcolor: "#666e7e" }}>
              <Button onClick={() => {setIsDialogOpen(false); setFormErrors({});}} color="inherit" sx={{ color: TEXT_PRIMARY }}>Cancelar</Button>
              <Button 
                onClick={handleAddOrUpdateProject} 
                variant="contained" 
                sx={{
                    bgcolor: HOVER_BG, 
                    color: TEXT_PRIMARY,
                    '&:hover': {
                        bgcolor: BORDER_COLOR, 
                    },
                }}
              >
                {editingProject ? "Salvar Alterações" : "Adicionar Projeto"}
              </Button>
            </DialogActions>
          </Dialog>
        </div>
        
        <Card sx={{ bgcolor: BACKGROUND_PAPER, color: TEXT_PRIMARY }}>
          <CardHeader title={<Typography variant="h6" color="text.primary">Lista de Projetos</Typography>} />
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
            ) : projects.length === 0 ? (
              <Typography color="text.secondary">
                Nenhum projeto encontrado.
              </Typography>
            ) : (
              <TableContainer 
                component={Paper} 
                sx={{ 
                    backgroundColor: BACKGROUND_PAPER,
                    color: TEXT_PRIMARY, 
                    boxShadow: 'none',
                    border: `1px solid ${BORDER_COLOR}`,
                }}
              >
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Nome</TableCell>
                      <TableCell>Descrição</TableCell>
                      <TableCell>Data</TableCell>
                      <TableCell>Capa</TableCell>
                      <TableCell>Galeria</TableCell>
                      <TableCell align="right">Ações</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {projects.map((project) => (
                      <TableRow 
                        key={project.id} 
                        sx={{ 
                            '&:last-child td, &:last-child th': { border: 0 },
                            '&:hover': { backgroundColor: HOVER_BG, '& .MuiTableCell-root': { color: TEXT_PRIMARY } }
                        }}
                      >
                        <TableCell component="th" scope="row">
                          {project.name}
                        </TableCell>
                        <TableCell>{project.description || "N/A"}</TableCell>
                        <TableCell>{new Date(project.date).toLocaleDateString()}</TableCell>
                        <TableCell>{project.cover_image ? "Sim" : "Não"}</TableCell>
                        <TableCell>{project.images && JSON.parse(project.images).length > 0 ? "Sim" : "Não"}</TableCell>
                        <TableCell align="right">
                          <Button
                            variant="text"
                            size="small"
                            onClick={() => handleEditClick(project)}
                            sx={{ minWidth: 'auto', p: 1, color: TEXT_PRIMARY }}
                          >
                            <EditIcon fontSize="small" />
                          </Button>
                          <Button
                            variant="text"
                            size="small"
                            onClick={() => confirmDelete(project.id)}
                            color="error"
                            sx={{ minWidth: 'auto', p: 1, ml: 1 }}
                          >
                            <Trash2Icon fontSize="small" />
                          </Button>
                          <Dialog
                            open={isConfirmDialogOpen && projectToDeleteId === project.id}
                            onClose={() => setIsConfirmDialogOpen(false)}
                            aria-labelledby="alert-dialog-title"
                            aria-describedby="alert-dialog-description"
                          >
                            <DialogTitle id="alert-dialog-title" color="text.primary" sx={{ bgcolor: "#666e7e" }}>{"Tem certeza?"}</DialogTitle>
                            <DialogContent>
                              <DialogContentText id="alert-dialog-description" color="text.secondary">
                                Esta ação não pode ser desfeita. Isso excluirá permanentemente o projeto.
                              </DialogContentText>
                            </DialogContent>
                            <DialogActions sx={{ bgcolor: "#666e7e" }}>
                              <Button onClick={() => setIsConfirmDialogOpen(false)} color="inherit" sx={{ color: TEXT_SECONDARY }}>Cancelar</Button>
                              <Button onClick={handleDeleteConfirmed} autoFocus variant="contained" color="error">
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

export default ProjectsPage;