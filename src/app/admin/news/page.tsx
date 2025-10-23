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
    // 3. Envolva todo o conteúdo da página com o MuiThemeProvider
    <MuiThemeProvider theme={muiTheme}>
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
            // MUDANÇA: Estilo do botão para neutro/escuro
            sx={{
                bgcolor: '#3f485c', // Cor de fundo neutra
                color: 'white',
                '&:hover': {
                    bgcolor: '#4f5a70', // Cor um pouco mais clara no hover
                },
            }}
          >
            Adicionar Notícia
          </Button>

          {/* MUDANÇA: Dialog ajustado para tema escuro */}
          <Dialog open={isDialogOpen} onClose={() => setIsDialogOpen(false)} 
            PaperProps={{ sx: { bgcolor: muiTheme.palette.background.paper, color: muiTheme.palette.text.primary } }}>
            
            <DialogTitle sx={{ backgroundColor: muiTheme.palette.background.default, color: muiTheme.palette.text.primary }}>
                {editingNews ? "Editar Notícia" : "Adicionar Nova Notícia"}
            </DialogTitle>
            
            <DialogContent sx={{backgroundColor: muiTheme.palette.background.paper}}>
              <DialogContentText color={muiTheme.palette.text.secondary}>
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
            
            <DialogActions sx={{ backgroundColor: muiTheme.palette.background.paper }}>
              <Button onClick={() => setIsDialogOpen(false)} color="inherit">Cancelar</Button>
              <Button 
                onClick={handleAddNews} 
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
                {editingNews ? "Salvar Alterações" : "Adicionar Notícia"}
              </Button>
            </DialogActions>
          </Dialog>
        </div>
        
        {/* MUDANÇA: Card e Tabela ajustados para tema escuro */}
        <Card sx={{ bgcolor: muiTheme.palette.background.paper, color: muiTheme.palette.text.primary }}>
          <CardHeader title={<Typography variant="h6" color="white">Lista de Notícias</Typography>} />
          <CardContent>
            {news.length === 0 ? (
              <Typography color="white">
                Nenhuma notícia encontrada.
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
                      <TableCell>Título</TableCell>
                      <TableCell>Autor</TableCell>
                      <TableCell>Data de Publicação</TableCell>
                      <TableCell align="right">Ações</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {news.map((newsItem) => (
                      <TableRow key={newsItem.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
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
                            sx={{ minWidth: 'auto', p: 1, color: muiTheme.palette.text.secondary }} // Ícone de Edição discreto
                          >
                            <EditIcon fontSize="small" />
                          </Button>
                          <Button
                            variant="text"
                            size="small"
                            onClick={() => confirmDelete(newsItem.id)}
                            color="error" // Cor de erro (vermelho) para o ícone de exclusão
                            sx={{ minWidth: 'auto', p: 1, ml: 1 }}
                          >
                            <Trash2Icon fontSize="small" />
                          </Button>
                          <Dialog
                            open={isConfirmDialogOpen && newsToDeleteId === newsItem.id}
                            onClose={() => setIsConfirmDialogOpen(false)}
                            PaperProps={{ sx: { bgcolor: muiTheme.palette.background.paper, color: muiTheme.palette.text.primary } }}
                            aria-labelledby="alert-dialog-title"
                            aria-describedby="alert-dialog-description"
                          >
                            <DialogTitle id="alert-dialog-title" sx={{ backgroundColor: muiTheme.palette.background.default, color: muiTheme.palette.text.primary }}>{"Tem certeza?"}</DialogTitle>
                            <DialogContent sx={{backgroundColor: muiTheme.palette.background.paper}}>
                              <DialogContentText id="alert-dialog-description" color={muiTheme.palette.text.secondary}>
                                Esta ação não pode ser desfeita. Isso excluirá permanentemente a notícia.
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

export default NewsPage;