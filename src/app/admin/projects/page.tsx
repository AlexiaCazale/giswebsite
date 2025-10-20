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

  type StatusChipProps = Pick<ChipProps, 'label' | 'size' | 'onClick'> & {
    sx: {
      bgcolor: string;
      color: string;
    };
  };

  const getStatusChipProps = (status: Project["status"]) => {
    switch (status) {
      case "Em Andamento":
        return { label: status, sx: { bgcolor: 'hsl(var(--vibrant-blue) / 0.2)', color: 'hsl(var(--vibrant-blue))' } };
      case "Concluído":
        return { label: status, sx: { bgcolor: 'hsl(var(--vibrant-green) / 0.2)', color: 'hsl(var(--vibrant-green))' } };
      case "Pendente":
        return { label: status, sx: { bgcolor: 'hsl(var(--vibrant-orange) / 0.2)', color: 'hsl(var(--vibrant-orange))' } };
      default:
        return { label: status, color: "default" };
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