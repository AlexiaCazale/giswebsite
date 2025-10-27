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

// Definição manual das cores para manter a estética do tema escuro suave (match AdminLayout/Dashboard)
const BACKGROUND_DEFAULT = "#2b2f3d"; // Fundo geral (match AdminLayout main background)
const BACKGROUND_PAPER = "#485164"; // Fundo de Cards/Modals/Tabelas (match Dashboard Card background)
const TEXT_PRIMARY = "#ffffffff"; // Cor do texto principal (claro)
const TEXT_SECONDARY = "#a0a0a0"; // Cor do texto secundário/Ícones
const HOVER_BG = "#414857ff"; // Fundo do hover/botão neutro
const PRIMARY_MAIN = "#181c2c"; // Cor primária (verde de destaque)
const BORDER_COLOR = "#3c485c"; // Cor da borda/divisor


// 2. Crie um tema local que define a fonte e as cores para o modo escuro suave
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
      // Simulação de toast de sucesso
      console.log("Membro atualizado com sucesso!");
    } else {
      const newId = String(members.length + 1);
      setMembers([...members, { ...newMemberData, id: newId, joinedDate: newMemberData.joinedDate || new Date().toISOString().split('T')[0] } as Member]);
      // Simulação de toast de sucesso
      console.log("Membro adicionado com sucesso!");
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
      // Simulação de toast de sucesso
      console.log("Membro excluído com sucesso!");
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
          <Typography variant="h5" component="h1" fontWeight="semibold" color="text.primary">
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
            // Corrigido para o estilo de botão neutro/suave
            sx={{
                bgcolor: BACKGROUND_PAPER, // Fundo neutro
                color: TEXT_PRIMARY,
                '&:hover': {
                    bgcolor: HOVER_BG, // Cor de hover um pouco mais escura
                },
            }}
          >
            Adicionar Membro
          </Button>

          {/* Dialog ajustado para tema escuro suave */}
          <Dialog open={isDialogOpen} onClose={() => setIsDialogOpen(false)}>
            
            <DialogTitle color="text.primary" bgcolor="#666e7e">
                {editingMember ? "Editar Membro" : "Adicionar Novo Membro"}
            </DialogTitle>
            
            <DialogContent>
              <DialogContentText color="text.primary">
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
            
            <DialogActions>
              <Button onClick={() => setIsDialogOpen(false)} color="inherit" sx={{ color: TEXT_PRIMARY }}>Cancelar</Button>
              <Button 
                onClick={handleAddMember} 
                variant="contained"
                // Corrigido para o estilo de botão neutro/suave
                sx={{
                    bgcolor: BACKGROUND_PAPER, 
                    color: TEXT_PRIMARY,
                    '&:hover': {
                        bgcolor: HOVER_BG,
                    },
                }}
              >
                {editingMember ? "Salvar Alterações" : "Adicionar Membro"}
              </Button>
            </DialogActions>
          </Dialog>
        </div>
        
        {/* Card e Tabela ajustados para tema escuro suave */}
        <Card sx={{ bgcolor: BACKGROUND_PAPER, color: TEXT_PRIMARY }}>
          <CardHeader title={<Typography variant="h6" color="text.primary">Lista de Membros</Typography>} />
          <CardContent>
            {members.length === 0 ? (
              <Typography color="text.secondary">
                Nenhum membro encontrado.
              </Typography>
            ) : (
              <TableContainer 
                component={Paper} 
                sx={{ 
                    backgroundColor: BACKGROUND_PAPER, 
                    color: TEXT_PRIMARY, 
                    boxShadow: 'none',
                    border: `1px solid ${BORDER_COLOR}`, // Borda sutil
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
                      // Linhas de cores alternadas ou hover poderiam ser adicionadas aqui
                      <TableRow 
                        key={member.id} 
                        sx={{ 
                            '&:last-child td, &:last-child th': { border: 0 },
                            '&:hover': { backgroundColor: "#414857ff" } // Efeito hover na linha
                        }}
                      >
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
                            sx={{ minWidth: 'auto', p: 1, color: TEXT_PRIMARY }} // Ícone de Edição discreto
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
                            aria-labelledby="alert-dialog-title"
                            aria-describedby="alert-dialog-description"
                          >
                            <DialogTitle id="alert-dialog-title" color="text.primary">{"Tem certeza?"}</DialogTitle>
                            <DialogContent>
                              <DialogContentText id="alert-dialog-description" color="text.secondary">
                                Esta ação não pode ser desfeita. Isso excluirá permanentemente o membro.
                              </DialogContentText>
                            </DialogContent>
                            <DialogActions>
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

export default MembersPage;
