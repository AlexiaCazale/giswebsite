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

const BACKGROUND_DEFAULT = "#2b2f3d"; // Fundo geral (match AdminLayout main background)
const BACKGROUND_PAPER = "#485164"; // Fundo de Cards/Modals/Tabelas (match Dashboard Card background)
const TEXT_PRIMARY = "#ffffffff"; // Cor do texto principal (claro)
const TEXT_SECONDARY = "#a0a0a0"; // Cor do texto secundário/Ícones
const HOVER_BG = "#414857ff"; // Fundo do hover/botão neutro
const PRIMARY_MAIN = "#181c2c"; // Cor primária (verde de destaque)
const BORDER_COLOR = "#3c485c"; // Cor da borda/divisor


// 2. Crie um tema local que define a fonte e as cores para o modo escuro, seguindo o padrão
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
          <Typography
            variant="h5"
            component="h1"
            fontWeight="semibold"
            color="text.primary" // Usa a cor de texto suave
          >
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
            // Estilo do botão neutro, usando as novas cores suaves
            sx={{
              bgcolor: HOVER_BG,
              color: TEXT_PRIMARY,
              '&:hover': {
                bgcolor: BORDER_COLOR,
              },
            }}
          >
            Adicionar Notícia
          </Button>

          {/* Dialog de Adição/Edição */}
          <Dialog open={isDialogOpen} onClose={() => setIsDialogOpen(false)}>

            <DialogTitle color="text.primary">
              {editingNews ? "Editar Notícia" : "Adicionar Nova Notícia"}
            </DialogTitle>

            <DialogContent>
              <DialogContentText color="text.primary">
                Preencha os detalhes da notícia aqui. Clique em salvar quando terminar.
              </DialogContentText>
              {/* Todos os TextFields herdam os estilos de tema escuro suave definidos em muiTheme.components */}
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
              <Button onClick={() => setIsDialogOpen(false)} color="inherit" sx={{ color: TEXT_PRIMARY }}>Cancelar</Button>
              <Button
                onClick={handleAddNews}
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
                {editingNews ? "Salvar Alterações" : "Adicionar Notícia"}
              </Button>
            </DialogActions>
          </Dialog>
        </div>

        {/* Card e Tabela ajustados para tema escuro suave */}
        <Card sx={{ bgcolor: BACKGROUND_PAPER, color: TEXT_PRIMARY }}>
          <CardHeader title={<Typography variant="h6" color="text.primary">Lista de Notícias</Typography>} />
          <CardContent>
            {news.length === 0 ? (
              <Typography color="text.secondary">
                Nenhuma notícia encontrada.
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
                      {/* TableCell Head usa o HOVER_BG definido em muiTheme.components */}
                      <TableCell>Título</TableCell>
                      <TableCell>Autor</TableCell>
                      <TableCell>Data de Publicação</TableCell>
                      <TableCell align="right">Ações</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {news.map((newsItem) => (
                      <TableRow
                        key={newsItem.id}
                        sx={{
                          '&:last-child td, &:last-child th': { border: 0 },
                          // Efeito hover na linha para destacar
                          '&:hover': { backgroundColor: HOVER_BG, '& .MuiTableCell-root': { color: TEXT_PRIMARY } }
                        }}
                      >
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
                            // Ícone de Edição discreto
                            sx={{ minWidth: 'auto', p: 1, color: TEXT_PRIMARY }}
                          >
                            <EditIcon fontSize="small" />
                          </Button>
                          <Button
                            variant="text"
                            size="small"
                            onClick={() => confirmDelete(newsItem.id)}
                            color="error" // Cor de erro (vermelho)
                            sx={{ minWidth: 'auto', p: 1, ml: 1 }}
                          >
                            <Trash2Icon fontSize="small" />
                          </Button>
                          {/* Dialog de Confirmação */}
                          <Dialog
                            open={isConfirmDialogOpen && newsToDeleteId === newsItem.id}
                            onClose={() => setIsConfirmDialogOpen(false)}
                            aria-labelledby="alert-dialog-title"
                            aria-describedby="alert-dialog-description"
                          >
                            <DialogTitle id="alert-dialog-title" color="text.primary">{"Tem certeza?"}</DialogTitle>
                            <DialogContent>
                              <DialogContentText id="alert-dialog-description" color="text.secondary">
                                Esta ação não pode ser desfeita. Isso excluirá permanentemente a notícia.
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

export default NewsPage;
