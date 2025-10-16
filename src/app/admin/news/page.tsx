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
} from "@mui/material";
import {
  AddCircleOutline as PlusCircleIcon,
  Edit as EditIcon,
  Delete as Trash2Icon,
} from "@mui/icons-material";
import { News, mockNews } from "@/app/lib/data";
import { showSuccess } from "@/utils/toast";

const NewsPage = () => {
  const [news, setNews] = useState<News[]>(mockNews);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingNews, setEditingNews] = useState<News | null>(null);
  const [newNewsData, setNewNewsData] = useState<Omit<News, "id"> & { id?: string }>(
    { title: "", author: "", publishDate: "", content: "" }
  );
  const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false);
  const [newsToDeleteId, setNewsToDeleteId] = useState<string | null>(null);

  const handleAddNews = () => {
    if (editingNews) {
      setNews(
        news.map((n) =>
          n.id === editingNews.id ? { ...newNewsData, id: n.id } as News : n
        )
      );
      showSuccess("Notícia atualizada com sucesso!");
    } else {
      const newId = `n${news.length + 1}`;
      setNews([...news, { ...newNewsData, id: newId, publishDate: newNewsData.publishDate || new Date().toISOString().split('T')[0] } as News]);
      showSuccess("Notícia adicionada com sucesso!");
    }
    setIsDialogOpen(false);
    setEditingNews(null);
    setNewNewsData({ title: "", author: "", publishDate: "", content: "" });
  };

  const handleEditClick = (newsItem: News) => {
    setEditingNews(newsItem);
    setNewNewsData(newsItem);
    setIsDialogOpen(true);
  };

  const confirmDelete = (id: string) => {
    setNewsToDeleteId(id);
    setIsConfirmDialogOpen(true);
  };

  const handleDeleteConfirmed = () => {
    if (newsToDeleteId) {
      setNews(news.filter((newsItem) => newsItem.id !== newsToDeleteId));
      showSuccess("Notícia excluída com sucesso!");
      setNewsToDeleteId(null);
      setIsConfirmDialogOpen(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setNewNewsData((prev) => ({ ...prev, [id]: value }));
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <Typography variant="h5" component="h1" fontWeight="semibold">
          Gerenciar Notícias
        </Typography>
        <Button
          variant="contained"
          startIcon={<PlusCircleIcon />}
          onClick={() => {
            setEditingNews(null);
            setNewNewsData({ title: "", author: "", publishDate: "", content: "" });
            setIsDialogOpen(true);
          }}
        >
          Adicionar Notícia
        </Button>
        <Dialog open={isDialogOpen} onClose={() => setIsDialogOpen(false)}>
          <DialogTitle>{editingNews ? "Editar Notícia" : "Adicionar Nova Notícia"}</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Preencha os detalhes da notícia aqui. Clique em salvar quando terminar.
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="title"
              label="Título"
              type="text"
              fullWidth
              variant="outlined"
              value={newNewsData.title}
              onChange={handleInputChange}
              sx={{ mt: 2 }}
            />
            <TextField
              margin="dense"
              id="author"
              label="Autor"
              type="text"
              fullWidth
              variant="outlined"
              value={newNewsData.author}
              onChange={handleInputChange}
              sx={{ mt: 2 }}
            />
            <TextField
              margin="dense"
              id="publishDate"
              label="Data de Publicação"
              type="date"
              fullWidth
              variant="outlined"
              InputLabelProps={{ shrink: true }}
              value={newNewsData.publishDate}
              onChange={handleInputChange}
              sx={{ mt: 2 }}
            />
            <TextField
              margin="dense"
              id="content"
              label="Conteúdo"
              multiline
              rows={4}
              fullWidth
              variant="outlined"
              value={newNewsData.content}
              onChange={handleInputChange}
              sx={{ mt: 2 }}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setIsDialogOpen(false)}>Cancelar</Button>
            <Button onClick={handleAddNews} variant="contained">
              {editingNews ? "Salvar Alterações" : "Adicionar Notícia"}
            </Button>
          </DialogActions>
        </Dialog>
      </div>
      <Card sx={{ bgcolor: 'background.paper', color: 'text.primary' }}>
        <CardHeader title={<Typography variant="h6">Lista de Notícias</Typography>} />
        <CardContent>
          {news.length === 0 ? (
            <Typography color="textSecondary">
              Nenhuma notícia encontrada.
            </Typography>
          ) : (
            <TableContainer component={Paper} sx={{ boxShadow: 'none' }}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Título</TableCell>
                    <TableCell>Autor</TableCell>
                    <TableCell>Data de Publicação</TableCell>
                    <TableCell align="right">Ações</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {news.map((newsItem) => (
                    <TableRow key={newsItem.id}>
                      <TableCell component="th" scope="row">
                        {newsItem.title}
                      </TableCell>
                      <TableCell>{newsItem.author}</TableCell>
                      <TableCell>{newsItem.publishDate}</TableCell>
                      <TableCell align="right">
                        <Button
                          variant="text"
                          size="small"
                          onClick={() => handleEditClick(newsItem)}
                          sx={{ minWidth: 'auto', p: 1 }}
                        >
                          <EditIcon fontSize="small" />
                        </Button>
                        <Button
                          variant="text"
                          size="small"
                          onClick={() => confirmDelete(newsItem.id)}
                          sx={{ minWidth: 'auto', p: 1, ml: 1 }}
                        >
                          <Trash2Icon fontSize="small" />
                        </Button>
                        <Dialog
                          open={isConfirmDialogOpen && newsToDeleteId === newsItem.id}
                          onClose={() => setIsConfirmDialogOpen(false)}
                          aria-labelledby="alert-dialog-title"
                          aria-describedby="alert-dialog-description"
                        >
                          <DialogTitle id="alert-dialog-title">{"Tem certeza?"}</DialogTitle>
                          <DialogContent>
                            <DialogContentText id="alert-dialog-description">
                              Esta ação não pode ser desfeita. Isso excluirá permanentemente a notícia.
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

export default NewsPage;