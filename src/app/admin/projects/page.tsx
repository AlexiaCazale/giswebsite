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
} from "@mui/material";
import {
  AddCircleOutline as PlusCircleIcon,
  Edit as EditIcon,
  Delete as Trash2Icon,
} from "@mui/icons-material";
import { showSuccess } from "@/utils/toast";
import { mockProjects, Project } from "@/app/lib/data";

const ProjectsPage = () => {
  const [projects, setProjects] = useState<Project[]>(mockProjects);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [newProjectData, setNewProjectData] = useState<Omit<Project, "id" | "members"> & { id?: string, members?: string }>(
    { name: "", status: "Pendente", startDate: "", endDate: "" }
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
    setNewProjectData({ name: "", status: "Pendente", startDate: "", endDate: "" });
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

  type StatusChipProps = {
    label: string;
    size: 'small';
    sx: SxProps<Theme>;
  };

  const getStatusChipProps = (status: string): StatusChipProps => {
    switch (status) {
      case 'Concluído':
        return {
          size: 'small', // Include size here for a cleaner call
          label: 'Concluído',
          sx: {
            bgcolor: 'hsl(142.1 76.2% 36.3%)', // Example: Green background
            color: 'hsl(142.1 70.2% 80.3%)',   // Example: Light text
          },
        };
      case 'Em Andamento':
        return {
          size: 'small',
          label: 'Em Andamento',
          sx: {
            bgcolor: 'hsl(47.9 95.8% 53.1%)', // Example: Yellow background
            color: 'hsl(47.9 95.8% 30.1%)',
          },
        };
      case 'Pendente':
        return {
          size: 'small',
          label: 'Pendente',
          sx: {
            bgcolor: 'hsl(210 40% 96.1%)', // Example: Light Gray
            color: 'hsl(210 40% 40.1%)',
          },
        };
      default:
        return {
          size: 'small',
          label: 'Desconhecido',
          sx: {
            bgcolor: 'hsl(0 0% 80%)',
            color: 'hsl(0 0% 20%)',
          },
        };
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <Typography variant="h5" component="h1" fontWeight="semibold">
          Gerenciar Projetos
        </Typography>
        <Button
          variant="contained"
          startIcon={<PlusCircleIcon />}
          onClick={() => {
            setEditingProject(null);
            setNewProjectData({ name: "", status: "Pendente", startDate: "", endDate: "" });
            setIsDialogOpen(true);
          }}
        >
          Adicionar Projeto
        </Button>

        <Dialog open={isDialogOpen} onClose={() => setIsDialogOpen(false)}>
          <DialogTitle>{editingProject ? "Editar Projeto" : "Adicionar Novo Projeto"}</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Preencha os detalhes do projeto aqui. Clique em salvar quando terminar.
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Nome"
              type="text"
              fullWidth
              variant="outlined"
              value={newProjectData.name}
              onChange={handleInputChange}
              sx={{ mt: 2 }}
            />
            <FormControl fullWidth margin="dense" sx={{ mt: 2 }}>
              <InputLabel id="status-label">Status</InputLabel>
              <Select
                labelId="status-label"
                id="status"
                name="status"
                value={newProjectData.status}
                label="Status"
                onChange={handleInputChange}
              >
                <MenuItem value="Pendente">Pendente</MenuItem>
                <MenuItem value="Em Andamento">Em Andamento</MenuItem>
                <MenuItem value="Concluído">Concluído</MenuItem>
              </Select>
            </FormControl>
            <TextField
              margin="dense"
              id="startDate"
              label="Data Início"
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
            <Button onClick={() => setIsDialogOpen(false)}>Cancelar</Button>
            <Button onClick={handleAddProject} variant="contained">
              {editingProject ? "Salvar Alterações" : "Adicionar Projeto"}
            </Button>
          </DialogActions>
        </Dialog>
      </div>
      <Card sx={{ bgcolor: 'background.paper', color: 'text.primary' }}>
        <CardHeader title={<Typography variant="h6">Lista de Projetos</Typography>} />
        <CardContent>
          {projects.length === 0 ? (
            <Typography color="textSecondary">
              Nenhum projeto encontrado.
            </Typography>
          ) : (
            <TableContainer component={Paper} sx={{ boxShadow: 'none' }}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Nome</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell>Data Início</TableCell>
                    <TableCell>Data Fim</TableCell>
                    <TableCell align="right">Ações</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {projects.map((project) => (
                    <TableRow key={project.id}>
                      <TableCell component="th" scope="row">
                        {project.name}
                      </TableCell>
                      <TableCell>
                        <Chip {...getStatusChipProps(project.status)} size="small" />
                      </TableCell>
                      <TableCell>{project.startDate}</TableCell>
                      <TableCell>{project.endDate || "N/A"}</TableCell>
                      <TableCell align="right">
                        <Button
                          variant="text"
                          size="small"
                          onClick={() => handleEditClick(project)}
                          sx={{ minWidth: 'auto', p: 1 }}
                        >
                          <EditIcon fontSize="small" />
                        </Button>
                        <Button
                          variant="text"
                          size="small"
                          onClick={() => confirmDelete(project.id)}
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
                          <DialogTitle id="alert-dialog-title">{"Tem certeza?"}</DialogTitle>
                          <DialogContent>
                            <DialogContentText id="alert-dialog-description">
                              Esta ação não pode ser desfeita. Isso excluirá permanentemente o projeto.
                            </DialogContentText>
                          </DialogContent>
                          <DialogActions>
                            <Button onClick={() => setIsConfirmDialogOpen(false)}>Cancelar</Button>
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
  );
};

export default ProjectsPage;