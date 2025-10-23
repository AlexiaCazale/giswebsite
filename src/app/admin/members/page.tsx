"use client";

import React, { useState } from "react";
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
  InputLabel,
  FormControl,
} from "@mui/material";
import {
  AddCircleOutline as PlusCircleIcon,
  Edit as EditIcon,
  Delete as Trash2Icon,
} from "@mui/icons-material";
import { Member, mockMembers } from "@/app/lib/data";
import { showSuccess } from "@/utils/toast";

// 1. Importe o createTheme e o ThemeProvider do MUI
import {
  createTheme,
  ThemeProvider as MuiThemeProvider,
} from "@mui/material/styles";

// 2. Crie um tema local que define a fonte e as cores para o modo escuro, seguindo o padrão
const muiTheme = createTheme({
  typography: {
    fontFamily: '"Montserrat", sans-serif',
  },
  palette: {
    mode: "dark", // Modo escuro ativado
    background: {
      default: "#181c2c", // Fundo geral (do layout)
      paper: "#2d303f", // Fundo de Cards, Modals, etc.
    },
    error: {
      main: "#ff6b6b", // Vermelho de erro
    },
    text: {
      primary: "#ffffff",
      secondary: "#b0b0b0",
    },
  },
  components: {
    // Estilos para harmonizar os inputs com o tema escuro
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          color: '#ffffff',
          '& .MuiOutlinedInput-notchedOutline': {
            borderColor: 'rgba(255, 255, 255, 0.2)',
          },
          '&:hover .MuiOutlinedInput-notchedOutline': {
            borderColor: 'rgba(255, 255, 255, 0.5)',
          },
          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor: 'rgba(255, 255, 255, 0.7)',
          },
        },
      },
    },
    MuiInputLabel: {
        styleOverrides: {
            root: {
                color: 'rgba(255, 255, 255, 0.7)',
                '&.Mui-focused': {
                    color: 'rgba(255, 255, 255, 0.9)',
                }
            }
        }
    },
    // Estilos para harmonizar a tabela
    MuiTableCell: {
        styleOverrides: {
            root: {
                color: '#ffffff',
                borderColor: '#2d303f',
            },
            head: {
                backgroundColor: '#2d303f',
                color: '#ffffff',
            }
        }
    },
    // Estilos para harmonizar o diálogo
    MuiDialog: {
        styleOverrides: {
            paper: {
                backgroundColor: '#2d303f',
                color: '#ffffff',
            }
        }
    }
  }
});

const MembersPage = () => {
  const [members, setMembers] = useState<Member[]>(mockMembers);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingMember, setEditingMember] = useState<Member | null>(null);
  const [newMemberData, setNewMemberData] = useState<Omit<Member, "id"> & { id?: string }>(
    { name: "", role: "", email: "", joinedDate: "" }
  );
  const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false);
  const [memberToDeleteId, setMemberToDeleteId] = useState<string | null>(null);

  const handleAddMember = () => {
    if (editingMember) {
      setMembers(
        members.map((m) =>
          m.id === editingMember.id ? { ...newMemberData, id: m.id } as Member : m
        )
      );
      showSuccess("Membro atualizado com sucesso!");
    } else {
      const newId = String(members.length + 1);
      setMembers([...members, { ...newMemberData, id: newId, joinedDate: newMemberData.joinedDate || new Date().toISOString().split('T')[0] } as Member]);
      showSuccess("Membro adicionado com sucesso!");
    }
    setIsDialogOpen(false);
    setEditingMember(null);
    setNewMemberData({ name: "", role: "", email: "", joinedDate: "" });
  };

  const handleEditClick = (member: Member) => {
    setEditingMember(member);
    setNewMemberData(member);
    setIsDialogOpen(true);
  };

  const confirmDelete = (id: string) => {
    setMemberToDeleteId(id);
    setIsConfirmDialogOpen(true);
  };

  const handleDeleteConfirmed = () => {
    if (memberToDeleteId) {
      setMembers(members.filter((member) => member.id !== memberToDeleteId));
      showSuccess("Membro excluído com sucesso!");
      setMemberToDeleteId(null);
      setIsConfirmDialogOpen(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setNewMemberData((prev) => ({ ...prev, [id]: value }));
  };

  return (
    // 3. Envolva todo o conteúdo da página com o MuiThemeProvider
    <MuiThemeProvider theme={muiTheme}>
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <Typography variant="h5" component="h1" fontWeight="semibold">
            Gerenciar Membros
          </Typography>
          <Button
            variant="contained"
            startIcon={<PlusCircleIcon />}
            onClick={() => {
              setEditingMember(null);
              setNewMemberData({ name: "", role: "", email: "", joinedDate: "" });
              setIsDialogOpen(true);
            }}
            // MUDANÇA: Estilo do botão para neutro/escuro
            sx={{
                bgcolor: '#3f485c', // Cor de fundo neutra
                color: 'white',
                '&:hover': {
                    bgcolor: '#4f5a70', // Cor um pouco mais clara no hover
                },
            }}
          >
            Adicionar Membro
          </Button>

          {/* MUDANÇA: Dialog ajustado para tema escuro */}
          <Dialog open={isDialogOpen} onClose={() => setIsDialogOpen(false)}
            PaperProps={{ sx: { bgcolor: muiTheme.palette.background.paper, color: muiTheme.palette.text.primary } }}>
            
            <DialogTitle sx={{ backgroundColor: muiTheme.palette.background.default, color: muiTheme.palette.text.primary }}>
                {editingMember ? "Editar Membro" : "Adicionar Novo Membro"}
            </DialogTitle>
            
            <DialogContent sx={{backgroundColor: muiTheme.palette.background.paper}}>
              <DialogContentText color={muiTheme.palette.text.secondary}>
                Preencha os detalhes do membro aqui. Clique em salvar quando terminar.
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
              />
              <TextField
                margin="dense"
                id="role"
                label="Função"
                type="text"
                fullWidth
                variant="outlined"
                value={newMemberData.role}
                onChange={handleInputChange}
                sx={{ mt: 2 }}
              />
              <TextField
                margin="dense"
                id="email"
                label="Email"
                type="email"
                fullWidth
                variant="outlined"
                value={newMemberData.email}
                onChange={handleInputChange}
                sx={{ mt: 2 }}
              />
              <TextField
                margin="dense"
                id="joinedDate"
                label="Data de Entrada"
                type="date"
                fullWidth
                variant="outlined"
                InputLabelProps={{ shrink: true }}
                value={newMemberData.joinedDate}
                onChange={handleInputChange}
                sx={{ mt: 2 }}
              />
            </DialogContent>
            
            <DialogActions sx={{ backgroundColor: muiTheme.palette.background.paper }}>
              <Button onClick={() => setIsDialogOpen(false)} color="inherit">Cancelar</Button>
              <Button 
                onClick={handleAddMember} 
                variant="contained"
                // MUDANÇA: Estilo do botão para neutro/escuro
                sx={{
                    bgcolor: '#3f485c', // Cor de fundo neutra
                    color: 'white',
                    '&:hover': {
                        bgcolor: '#4f5a70', // Cor um pouco mais clara no hover
                    },
                }}
              >
                {editingMember ? "Salvar Alterações" : "Adicionar Membro"}
              </Button>
            </DialogActions>
          </Dialog>
        </div>
        
        {/* MUDANÇA: Card e Tabela ajustados para tema escuro */}
        <Card sx={{ bgcolor: muiTheme.palette.background.paper, color: muiTheme.palette.text.primary }}>
          <CardHeader title={<Typography variant="h6" color="white">Lista de Membros</Typography>} />
          <CardContent>
            {members.length === 0 ? (
              <Typography color="white">
                Nenhum membro encontrado.
              </Typography>
            ) : (
              <TableContainer 
                component={Paper} 
                sx={{ 
                    backgroundColor: muiTheme.palette.background.paper, 
                    color: muiTheme.palette.text.primary, 
                    boxShadow: 'none',
                    border: '1px solid #3f485c', // Borda sutil
                }}
              >
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Nome</TableCell>
                      <TableCell>Função</TableCell>
                      <TableCell>Email</TableCell>
                      <TableCell>Data de Entrada</TableCell>
                      <TableCell align="right">Ações</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {members.map((member) => (
                      <TableRow key={member.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                        <TableCell component="th" scope="row">
                          {member.name}
                        </TableCell>
                        <TableCell>{member.role}</TableCell>
                        <TableCell>{member.email}</TableCell>
                        <TableCell>{member.joinedDate}</TableCell>
                        <TableCell align="right">
                          <Button
                            variant="text"
                            size="small"
                            onClick={() => handleEditClick(member)}
                            sx={{ minWidth: 'auto', p: 1, color: muiTheme.palette.text.secondary }} // Ícone de Edição discreto
                          >
                            <EditIcon fontSize="small" />
                          </Button>
                          <Button
                            variant="text"
                            size="small"
                            onClick={() => confirmDelete(member.id)}
                            color="error" // Cor de erro (vermelho) para o ícone de exclusão
                            sx={{ minWidth: 'auto', p: 1, ml: 1 }}
                          >
                            <Trash2Icon fontSize="small" />
                          </Button>
                          <Dialog
                            open={isConfirmDialogOpen && memberToDeleteId === member.id}
                            onClose={() => setIsConfirmDialogOpen(false)}
                            PaperProps={{ sx: { bgcolor: muiTheme.palette.background.paper, color: muiTheme.palette.text.primary } }}
                            aria-labelledby="alert-dialog-title"
                            aria-describedby="alert-dialog-description"
                          >
                            <DialogTitle id="alert-dialog-title" sx={{ backgroundColor: muiTheme.palette.background.default, color: muiTheme.palette.text.primary }}>{"Tem certeza?"}</DialogTitle>
                            <DialogContent sx={{backgroundColor: muiTheme.palette.background.paper}}>
                              <DialogContentText id="alert-dialog-description" color={muiTheme.palette.text.secondary}>
                                Esta ação não pode ser desfeita. Isso excluirá permanentemente o membro.
                              </DialogContentText>
                            </DialogContent>
                            <DialogActions sx={{ backgroundColor: muiTheme.palette.background.paper }}>
                              <Button onClick={() => setIsConfirmDialogOpen(false)} color="inherit">Cancelar</Button>
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

export default MembersPage;