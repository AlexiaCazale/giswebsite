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

const muiTheme = createTheme({
  typography: {
    fontFamily: '"Montserrat", sans-serif',
  },
  palette: {
    mode: "dark",
    background: {
      default: "#181c2c",
      paper: "#2d303f",
    },
    // Removi a cor primária de destaque (azul) daqui para não afetar os botões "Adicionar"
    // Agora, se quiser um botão de destaque, terá que especificar a cor manualmente.
    // primary: {
    //   main: "#00e5ff",
    //   contrastText: "#000000",
    // },
    secondary: {
      main: "#ff4081",
    },
    error: {
      main: "#ff6b6b",
    },
    success: { // Adicionado para chips
        main: '#4CAF50', // Exemplo de verde
        dark: '#2E7D32', // Verde mais escuro
    },
    warning: { // Adicionado para chips
        main: '#FFC107', // Exemplo de amarelo
        dark: '#FFA000', // Laranja mais escuro
    },
    text: {
      primary: "#ffffff",
      secondary: "#b0b0b0",
    },
  },
  components: {
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          color: '#ffffff', // Cor do texto do input
          '& .MuiOutlinedInput-notchedOutline': {
            borderColor: 'rgba(255, 255, 255, 0.2)',
          },
          '&:hover .MuiOutlinedInput-notchedOutline': {
            borderColor: 'rgba(255, 255, 255, 0.5)',
          },
          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor: 'rgba(255, 255, 255, 0.7)', // Um tom de cinza claro para o foco
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
    // Estilo para Select (MenuItem)
    MuiMenu: {
        styleOverrides: {
            paper: {
                backgroundColor: '#2d303f', // Fundo do dropdown do Select
                color: '#ffffff',
            },
        },
    },
    MuiMenuItem: {
        styleOverrides: {
            root: {
                color: '#ffffff',
                '&:hover': {
                    backgroundColor: '#3f485c', // Cor de hover para itens do dropdown
                },
                '&.Mui-selected': {
                    backgroundColor: '#3f485c', // Cor de seleção para itens do dropdown
                    '&:hover': {
                        backgroundColor: '#3f485c',
                    },
                },
            },
        },
    },
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
          <Typography variant="h5" component="h1" fontWeight="semibold">
            Gerenciar Projetos
          </Typography>
          <Button
            variant="contained"
            // MUDANÇA: Removido color="primary". Definindo cor de fundo manualmente.
            sx={{
                bgcolor: '#3f485c', // Cor de fundo neutra, mas visível
                color: 'white',
                '&:hover': {
                    bgcolor: '#4f5a70', // Cor um pouco mais clara no hover
                },
            }}
            startIcon={<PlusCircleIcon />}
            onClick={() => {
              setEditingProject(null);
              setNewProjectData({ name: "", startDate: "", endDate: "" });
              setIsDialogOpen(true);
            }}
          >
            Adicionar Projeto
          </Button>

          <Dialog open={isDialogOpen} onClose={() => setIsDialogOpen(false)} PaperProps={{ sx: { bgcolor: muiTheme.palette.background.paper, color: muiTheme.palette.text.primary } }}>
            <DialogTitle sx={{ backgroundColor: muiTheme.palette.background.default, color: muiTheme.palette.text.primary }}>
                {editingProject ? "Editar Projeto" : "Adicionar Novo Projeto"}
            </DialogTitle>
            <DialogContent sx={{backgroundColor: muiTheme.palette.background.paper}}>
              <DialogContentText color={muiTheme.palette.text.secondary}>
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
            <DialogActions sx={{ backgroundColor: muiTheme.palette.background.paper }}>
              <Button onClick={() => setIsDialogOpen(false)} color="inherit">Cancelar</Button>
              <Button 
                onClick={handleAddProject} 
                variant="contained" 
                // MUDANÇA: Removido color="primary". Definindo cor de fundo manualmente.
                sx={{
                    bgcolor: '#3f485c', // Cor de fundo neutra
                    color: 'white',
                    '&:hover': {
                        bgcolor: '#4f5a70', // Cor um pouco mais clara no hover
                    },
                }}
              >
                {editingProject ? "Salvar Alterações" : "Adicionar Projeto"}
              </Button>
            </DialogActions>
          </Dialog>
        </div>
        
        <Card sx={{ bgcolor: muiTheme.palette.background.paper, color: muiTheme.palette.text.primary }}>
          <CardHeader title={<Typography variant="h6" color="white">Lista de Projetos</Typography>} />
          <CardContent>
            {projects.length === 0 ? (
              <Typography color="white">
                Nenhum projeto encontrado.
              </Typography>
            ) : (
              <TableContainer 
                component={Paper} 
                sx={{ 
                    backgroundColor: muiTheme.palette.background.paper,
                    color: muiTheme.palette.text.primary, 
                    boxShadow: 'none',
                    border: '1px solid #3f485c',
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
                      <TableRow key={project.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
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
                            sx={{ minWidth: 'auto', p: 1, color: muiTheme.palette.text.secondary }}
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
                            PaperProps={{ sx: { bgcolor: muiTheme.palette.background.paper, color: muiTheme.palette.text.primary } }}
                            aria-labelledby="alert-dialog-title"
                            aria-describedby="alert-dialog-description"
                          >
                            <DialogTitle id="alert-dialog-title" sx={{ backgroundColor: muiTheme.palette.background.default, color: muiTheme.palette.text.primary }}>{"Tem certeza?"}</DialogTitle>
                            <DialogContent sx={{backgroundColor: muiTheme.palette.background.paper}}>
                              <DialogContentText id="alert-dialog-description" color={muiTheme.palette.text.secondary}>
                                Esta ação não pode ser desfeita. Isso excluirá permanentemente o projeto.
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

export default ProjectsPage;