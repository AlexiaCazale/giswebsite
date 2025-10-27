"use client";

import React, { ChangeEvent, useState } from "react";
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
  Select,
  MenuItem,
  Chip,
  LinearProgress,
  SelectChangeEvent,
  ChipProps,
  SxProps,
  Theme,
  Box,
} from "@mui/material";
import {
  AddCircleOutline as PlusCircleIcon,
  Edit as EditIcon,
  Delete as Trash2Icon,
} from "@mui/icons-material";
import { showSuccess } from "@/utils/toast";
import { mockProjects, Project } from "@/app/lib/data";

import {
  createTheme,
  ThemeProvider as MuiThemeProvider,
} from "@mui/material/styles";

// Definição manual das cores para TEMA ESCURO SUAVE (match AdminLayout/Dashboard)
const BACKGROUND_DEFAULT = "#2b2f3d"; // Fundo geral (match AdminLayout main background)
const BACKGROUND_PAPER = "#485164"; // Fundo de Cards/Modals/Tabelas (match Dashboard Card background)
const TEXT_PRIMARY = "#ffffffff"; // Cor do texto principal (claro)
const TEXT_SECONDARY = "#a0a0a0"; // Cor do texto secundário/Ícones
const HOVER_BG = "#414857ff"; // Fundo do hover/botão neutro
const PRIMARY_MAIN = "#181c2c"; // Cor primária (verde de destaque)
const BORDER_COLOR = "#3c485c"; // Cor da borda/divisor

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
  const [projects, setProjects] = useState<Project[]>(mockProjects);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [newProjectData, setNewProjectData] = useState<Omit<Project, "id" | "members"> & { id?: string, members?: string }>(
    { name: "", startDate: "", endDate: "" }
  );
  const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false);
  const [projectToDeleteId, setProjectToDeleteId] = useState<string | null>(null);

  const handleAddProject = () => {
    if (editingProject) {
      setProjects(
        projects.map((p) =>
          p.id === editingProject.id ? { ...newProjectData, id: p.id, members: [] } as Project : p
        )
      );
      showSuccess("Projeto atualizado com sucesso!");
    } else {
      const newId = `p${projects.length + 1}`;
      setProjects([...projects, { ...newProjectData, id: newId, members: [] } as Project]);
      showSuccess("Projeto adicionado com sucesso!");
    }
    setIsDialogOpen(false);
    setEditingProject(null);
    setNewProjectData({ name: "", startDate: "", endDate: "" });
  };

  const handleEditClick = (project: Project) => {
    setEditingProject(project);
    const dataForState = {
      ...project,
      members: project.members.join(', '),
    };
    setNewProjectData(dataForState);
    setIsDialogOpen(true);
  };

  const confirmDelete = (id: string) => {
    setProjectToDeleteId(id);
    setIsConfirmDialogOpen(true);
  };

  const handleDeleteConfirmed = () => {
    if (projectToDeleteId) {
      setProjects(projects.filter((project) => project.id !== projectToDeleteId));
      showSuccess("Projeto excluído com sucesso!");
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
  };

  return (
    <MuiThemeProvider theme={muiTheme}>
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <Typography 
            variant="h5" 
            component="h1" 
            fontWeight="semibold"
            color="text.primary" // Corrigido para a cor de texto suave
          >
            Gerenciar Projetos
          </Typography>
          <Button
            variant="contained"
            startIcon={<PlusCircleIcon />}
            onClick={() => {
              setEditingProject(null);
              setNewProjectData({ name: "", startDate: "", endDate: "" });
              setIsDialogOpen(true);
            }}
            // Estilo do botão neutro, usando as novas cores suaves
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

          <Dialog open={isDialogOpen} onClose={() => setIsDialogOpen(false)}>
            <DialogTitle color="text.primary">
                {editingProject ? "Editar Projeto" : "Adicionar Novo Projeto"}
            </DialogTitle>
            <DialogContent>
              <DialogContentText color="text.primary">
                Preencha os detalhes do projeto aqui. Clique em salvar quando terminar.
              </DialogContentText>
              {/* TextFields herdam os novos estilos de Input e Label */}
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
              />
              <TextField
                margin="dense"
                id="startDate"
                label="Data Início"
                name="startDate"
                type="date"
                fullWidth
                variant="outlined"
                InputLabelProps={{ shrink: true }}
                value={newProjectData.startDate}
                onChange={handleInputChange}
                sx={{ mt: 2 }}
              />
              <TextField
                margin="dense"
                id="endDate"
                label="Data Fim"
                name="endDate"
                type="date"
                fullWidth
                variant="outlined"
                InputLabelProps={{ shrink: true }}
                value={newProjectData.endDate || ""}
                onChange={handleInputChange}
                sx={{ mt: 2 }}
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setIsDialogOpen(false)} color="inherit" sx={{ color: TEXT_PRIMARY }}>Cancelar</Button>
              <Button 
                onClick={handleAddProject} 
                variant="contained" 
                // Botão de salvar com estilo neutro/suave
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
        
        {/* Card e Tabela ajustados para tema escuro suave */}
        <Card sx={{ bgcolor: BACKGROUND_PAPER, color: TEXT_PRIMARY }}>
          <CardHeader title={<Typography variant="h6" color="text.primary">Lista de Projetos</Typography>} />
          <CardContent>
            {projects.length === 0 ? (
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
                    border: `1px solid ${BORDER_COLOR}`, // Borda sutil
                }}
              >
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Nome</TableCell>
                      <TableCell>Data Início</TableCell>
                      <TableCell>Data Fim</TableCell>
                      <TableCell align="right">Ações</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {projects.map((project) => (
                      <TableRow 
                        key={project.id} 
                        sx={{ 
                            '&:last-child td, &:last-child th': { border: 0 },
                            // Efeito hover na linha para destacar
                            '&:hover': { backgroundColor: HOVER_BG, '& .MuiTableCell-root': { color: TEXT_PRIMARY } }
                        }}
                      >
                        <TableCell component="th" scope="row">
                          {project.name}
                        </TableCell>
                        <TableCell>{project.startDate}</TableCell>
                        <TableCell>{project.endDate || "N/A"}</TableCell>
                        <TableCell align="right">
                          <Button
                            variant="text"
                            size="small"
                            onClick={() => handleEditClick(project)}
                            // Ícone de Edição discreto
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
                          {/* Dialog de Confirmação */}
                          <Dialog
                            open={isConfirmDialogOpen && projectToDeleteId === project.id}
                            onClose={() => setIsConfirmDialogOpen(false)}
                            aria-labelledby="alert-dialog-title"
                            aria-describedby="alert-dialog-description"
                          >
                            <DialogTitle id="alert-dialog-title" color="text.primary">{"Tem certeza?"}</DialogTitle>
                            <DialogContent>
                              <DialogContentText id="alert-dialog-description" color="text.secondary">
                                Esta ação não pode ser desfeita. Isso excluirá permanentemente o projeto.
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

export default ProjectsPage;
