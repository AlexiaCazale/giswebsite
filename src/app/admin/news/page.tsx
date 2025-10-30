"use client";

import React, { useState, useEffect } from "react";
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
  Box,
} from "@mui/material";
import {
  AddCircleOutline as PlusCircleIcon,
  Edit as EditIcon,
  Delete as Trash2Icon,
} from "@mui/icons-material";
import { showSuccess, showError } from "@/utils/toast";
import { supabase } from "@/integrations/supabase/client"; // Importar cliente Supabase

// 1. Importe o createTheme e o ThemeProvider do MUI
import {
  createTheme,
  ThemeProvider as MuiThemeProvider,
} from "@mui/material/styles";
import Link from "next/link";
import ImageUpload from "@/app/components/admin/ImageUpload"; // Importar o novo componente
import { v4 as uuidv4 } from "uuid"; // Importar uuid para nomes de arquivos únicos

// Interface para Notícias (ajustada para o novo esquema do DB)
interface NewsItem {
  id: string;
  title: string;
  author: string;
  // content: string; // REMOVIDO
  link_url?: string; // Renomeado de news_link
  image?: string;
  created_at: string;
  user_id: string;
}

const BACKGROUND_DEFAULT = "#2b2f3d";
const BACKGROUND_PAPER = "#485164";
const TEXT_PRIMARY = "#ffffffff";
const TEXT_SECONDARY = "#a0a0a0";
const HOVER_BG = "#414857ff";
const PRIMARY_MAIN = "#181c2c";
const BORDER_COLOR = "#3c485c";


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
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingNews, setEditingNews] = useState<NewsItem | null>(null);
  const [newNewsData, setNewNewsData] = useState<Omit<NewsItem, "id" | "created_at" | "user_id"> & { id?: string }>(
    { title: "", author: "", link_url: "", image: "" } // 'content' removido
  );
  const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false);
  const [newsToDeleteId, setNewsToDeleteId] = useState<string | null>(null);
  const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({}); // Estado para erros do formulário

  // Estados para o ImageUpload
  const [selectedNewFiles, setSelectedNewFiles] = useState<File[]>([]);
  const [currentImageUrlsForUpload, setCurrentImageUrlsForUpload] = useState<
    string[]
  >([]);

  const fetchNews = async () => {
    setLoading(true);
    const { data: user, error: userError } = await supabase.auth.getUser();
    if (userError || !user?.user) {
      showError("Você precisa estar logado para ver as notícias.");
      setLoading(false);
      return;
    }

    const { data, error } = await supabase
      .from("news")
      .select("*")
      .eq("user_id", user.user.id)
      .order("created_at", { ascending: false });

    if (error) {
      showError("Erro ao buscar notícias: " + error.message);
    } else {
      setNews(data as NewsItem[]);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchNews();
  }, []);

  // Função de validação
  const validateForm = () => {
    const errors: { [key: string]: string } = {};
    if (!newNewsData.title.trim()) {
      errors.title = "O título da notícia é obrigatório.";
    }
    if (!newNewsData.author.trim()) {
      errors.author = "O autor da notícia é obrigatório.";
    }
    if (!newNewsData.link_url?.trim()) {
      errors.link_url = "A URL do link é obrigatória.";
    }
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const uploadImage = async (file: File, userId: string): Promise<string | null> => {
    const fileExtension = file.name.split(".").pop();
    const fileName = `${uuidv4()}.${fileExtension}`;
    const filePath = `${userId}/${fileName}`; // Pasta por user_id

    const { data, error } = await supabase.storage
      .from("news-images") // Nome do bucket para imagens de notícias
      .upload(filePath, file, {
        cacheControl: "3600",
        upsert: false,
      });

    if (error) {
      showError("Erro ao fazer upload da imagem: " + error.message);
      return null;
    }

    // Retorna a URL pública da imagem
    const { data: publicUrlData } = supabase.storage
      .from("news-images")
      .getPublicUrl(filePath);

    return publicUrlData.publicUrl;
  };

  const handleAddOrUpdateNews = async () => {
    if (!validateForm()) {
      showError("Por favor, preencha todos os campos obrigatórios.");
      return;
    }

    const { data: user, error: userError } = await supabase.auth.getUser();
    if (userError || !user?.user) {
      showError("Você precisa estar logado para adicionar/editar notícias.");
      return;
    }

    let imageUrl: string | null = newNewsData.image || null;

    // Se houver novos arquivos selecionados, faça o upload do primeiro (apenas um para notícias)
    if (selectedNewFiles.length > 0) {
      const uploadedUrl = await uploadImage(selectedNewFiles[0], user.user.id);
      if (uploadedUrl) {
        imageUrl = uploadedUrl;
      } else {
        // Se o upload falhar, não continue com a operação de salvar
        return;
      }
    } else if (currentImageUrlsForUpload.length > 0) {
      // Se não houver novos arquivos, mas houver URLs existentes (que não foram removidas)
      imageUrl = currentImageUrlsForUpload[0];
    } else {
      // Se não houver novos arquivos nem URLs existentes, a imagem é nula
      imageUrl = null;
    }

    if (editingNews) {
      const { error } = await supabase
        .from("news")
        .update({
          title: newNewsData.title,
          author: newNewsData.author,
          // content: newNewsData.content, // REMOVIDO
          link_url: newNewsData.link_url,
          image: imageUrl, // Usar a URL da imagem
        })
        .eq("id", editingNews.id)
        .eq("user_id", user.user.id);

      if (error) {
        showError("Erro ao atualizar notícia: " + error.message);
      } else {
        showSuccess("Notícia atualizada com sucesso!");
        fetchNews();
      }
    } else {
      const { error } = await supabase.from("news").insert({
        user_id: user.user.id,
        title: newNewsData.title,
        author: newNewsData.author,
        // content: newNewsData.content, // REMOVIDO
        link_url: newNewsData.link_url,
        image: imageUrl, // Usar a URL da imagem
      });

      if (error) {
        showError("Erro ao adicionar notícia: " + error.message);
      } else {
        showSuccess("Notícia adicionada com sucesso!");
        fetchNews();
      }
    }
    setIsDialogOpen(false);
    setEditingNews(null);
    setNewNewsData({ title: "", author: "", link_url: "", image: "" }); // 'content' removido
    setSelectedNewFiles([]); // Limpar arquivos selecionados
    setCurrentImageUrlsForUpload([]); // Limpar URLs existentes
    setFormErrors({}); // Limpar erros do formulário
  };

  const handleEditClick = (newsItem: NewsItem) => {
    setEditingNews(newsItem);
    setNewNewsData({
      title: newsItem.title,
      author: newsItem.author,
      // content: newsItem.content, // REMOVIDO
      link_url: newsItem.link_url || "",
      image: newsItem.image || "",
    });
    // Preencher o ImageUpload com a URL existente
    setCurrentImageUrlsForUpload(newsItem.image ? [newsItem.image] : []);
    setSelectedNewFiles([]); // Limpar quaisquer arquivos novos pré-selecionados
    setFormErrors({}); // Limpar erros do formulário
    setIsDialogOpen(true);
  };

  const confirmDelete = (id: string) => {
    setNewsToDeleteId(id);
    setIsConfirmDialogOpen(true);
  };

  const handleDeleteConfirmed = async () => {
    if (newsToDeleteId) {
      const { data: user, error: userError } = await supabase.auth.getUser();
      if (userError || !user?.user) {
        showError("Você precisa estar logado para excluir notícias.");
        return;
      }

      // Opcional: Excluir imagem do storage se houver
      const newsToDelete = news.find(n => n.id === newsToDeleteId);
      if (newsToDelete?.image) {
        const filePath = newsToDelete.image.split('/').slice(-2).join('/'); // Extrai 'user_id/filename.ext'
        const { error: deleteImageError } = await supabase.storage
          .from('news-images')
          .remove([filePath]);
        if (deleteImageError) {
          console.error("Erro ao excluir imagem do storage:", deleteImageError.message);
          // Não mostramos erro para o usuário final, pois a exclusão da notícia é mais importante
        }
      }

      const { error } = await supabase
        .from("news")
        .delete()
        .eq("id", newsToDeleteId)
        .eq("user_id", user.user.id);

      if (error) {
        showError("Erro ao excluir notícia: " + error.message);
      } else {
        showSuccess("Notícia excluída com sucesso!");
        fetchNews();
      }
      setNewsToDeleteId(null);
      setIsConfirmDialogOpen(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setNewNewsData((prev) => ({ ...prev, [id]: value }));
    // Limpar erro específico ao digitar
    setFormErrors(prev => ({ ...prev, [id]: "" }));
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
              setNewNewsData({ title: "", author: "", link_url: "", image: "" }); // 'content' removido
              setSelectedNewFiles([]); // Limpar arquivos selecionados
              setCurrentImageUrlsForUpload([]); // Limpar URLs existentes
              setFormErrors({}); // Limpar erros do formulário
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
          <Dialog open={isDialogOpen} onClose={() => {setIsDialogOpen(false); setFormErrors({});}}>

            <DialogTitle color="text.primary" sx={{ bgcolor: "#666e7e" }}>
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
                error={!!formErrors.title}
                helperText={formErrors.title}
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
                error={!!formErrors.author}
                helperText={formErrors.author}
              />
              <TextField
                margin="dense"
                id="link_url"
                label="URL do Link"
                type="url"
                fullWidth
                variant="outlined"
                value={newNewsData.link_url}
                onChange={handleInputChange}
                sx={{ mt: 2 }}
                error={!!formErrors.link_url}
                helperText={formErrors.link_url}
              />
              {/* Componente ImageUpload para uma única imagem */}
              <ImageUpload
                label="Imagem de Capa"
                initialImageUrls={currentImageUrlsForUpload}
                onImageUrlsChange={setCurrentImageUrlsForUpload}
                onNewFilesChange={setSelectedNewFiles}
                multiple={false} // Apenas uma imagem para capa
              />
              {/* TextField de Conteúdo REMOVIDO */}
            </DialogContent>

            <DialogActions sx={{ bgcolor: "#666e7e" }}>
              <Button onClick={() => {setIsDialogOpen(false); setFormErrors({});}} color="inherit" sx={{ color: TEXT_PRIMARY }}>Cancelar</Button>
              <Button
                onClick={handleAddOrUpdateNews}
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
            ) : news.length === 0 ? (
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
                      <TableCell>Título</TableCell>
                      <TableCell>Autor</TableCell>
                      <TableCell>Link</TableCell>
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
                        <TableCell>
                          <Link href={newsItem.link_url || "#"} target="_blank" rel="noopener noreferrer" style={{ color: TEXT_PRIMARY, textDecoration: 'underline' }}>
                            {newsItem.link_url ? "Ver Notícia" : "N/A"}
                          </Link>
                        </TableCell>
                        <TableCell>{new Date(newsItem.created_at).toLocaleDateString()}</TableCell>
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
                            <DialogTitle id="alert-dialog-title" color="text.primary" sx={{ bgcolor: "#666e7e" }}>{"Tem certeza?"}</DialogTitle>
                            <DialogContent>
                              <DialogContentText id="alert-dialog-description" color="text.secondary">
                                Esta ação não pode ser desfeita. Isso excluirá permanentemente a notícia.
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

export default NewsPage;