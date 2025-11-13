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
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableContainer,
  Paper,
  CircularProgress,
  Box,
  IconButton,
  Tooltip,
} from "@mui/material";
import {
  Delete as Trash2Icon,
  MarkEmailRead as MarkAsReadIcon,
  MarkEmailUnread as MarkAsUnreadIcon,
} from "@mui/icons-material";
import { showSuccess, showError } from "@/utils/toast";
import { supabase } from "@/integrations/supabase/client";
import {
  createTheme,
  ThemeProvider as MuiThemeProvider,
} from "@mui/material/styles";

interface Message {
  id: number;
  name: string;
  email: string;
  message: string;
  created_at: string;
  is_read: boolean;
}

const BACKGROUND_DEFAULT = "#2b2f3d";
const BACKGROUND_PAPER = "#485164";
const TEXT_PRIMARY = "#ffffffff";
const TEXT_SECONDARY = "#a0a0a0";
const HOVER_BG = "#414857ff";
const PRIMARY_MAIN = "#181c2c";
const BORDER_COLOR = "#3c485c";

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
      main: "#ff6b6b",
    },
    text: {
      primary: TEXT_PRIMARY,
      secondary: TEXT_SECONDARY,
    },
  },
  components: {
    MuiTableCell: {
      styleOverrides: {
        root: {
          color: TEXT_PRIMARY,
          borderColor: BORDER_COLOR,
        },
        head: {
          backgroundColor: BACKGROUND_DEFAULT,
          color: TEXT_PRIMARY,
          fontWeight: "bold",
        },
      },
    },
    MuiDialog: {
      styleOverrides: {
        paper: {
          backgroundColor: BACKGROUND_PAPER,
          color: TEXT_PRIMARY,
        },
      },
    },
    MuiDialogActions: {
      styleOverrides: {
        root: {
          backgroundColor: "#666e7e",
        },
      },
    },
    MuiDialogTitle: {
      styleOverrides: {
        root: {
          backgroundColor: "#666e7e",
        },
      },
    },
  },
});

const MessagesPage = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false);
  const [messageToDeleteId, setMessageToDeleteId] = useState<number | null>(
    null
  );

  const fetchMessages = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("contact_messages")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      showError("Erro ao buscar mensagens: " + error.message);
    } else {
      setMessages(data as Message[]);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  const confirmDelete = (id: number) => {
    setMessageToDeleteId(id);
    setIsConfirmDialogOpen(true);
  };

  const handleDeleteConfirmed = async () => {
    if (messageToDeleteId) {
      const { error } = await supabase
        .from("contact_messages")
        .delete()
        .eq("id", messageToDeleteId);

      if (error) {
        showError("Erro ao excluir mensagem: " + error.message);
      } else {
        showSuccess("Mensagem excluída com sucesso!");
        fetchMessages();
      }
      setMessageToDeleteId(null);
      setIsConfirmDialogOpen(false);
    }
  };

  const toggleReadStatus = async (message: Message) => {
    const { error } = await supabase
      .from("contact_messages")
      .update({ is_read: !message.is_read })
      .eq("id", message.id);

    if (error) {
      showError("Erro ao atualizar status da mensagem: " + error.message);
    } else {
      showSuccess(
        `Mensagem marcada como ${!message.is_read ? "lida" : "não lida"}.`
      );
      fetchMessages();
    }
  };

  return (
    <MuiThemeProvider theme={muiTheme}>
      <div className="flex flex-col gap-4">
        <Typography
          variant="h5"
          component="h1"
          fontWeight="semibold"
          color="text.primary"
        >
          Caixa de Entrada
        </Typography>

        <Card sx={{ bgcolor: BACKGROUND_PAPER, color: TEXT_PRIMARY }}>
          <CardHeader
            title={
              <Typography variant="h6" color="text.primary">
                Mensagens Recebidas
              </Typography>
            }
          />
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
            ) : messages.length === 0 ? (
              <Typography color="text.secondary">
                Nenhuma mensagem encontrada.
              </Typography>
            ) : (
              <TableContainer
                component={Paper}
                sx={{
                  backgroundColor: BACKGROUND_PAPER,
                  color: TEXT_PRIMARY,
                  boxShadow: "none",
                  border: `1px solid ${BORDER_COLOR}`,
                }}
              >
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Data</TableCell>
                      <TableCell>Nome</TableCell>
                      <TableCell>Email</TableCell>
                      <TableCell>Mensagem</TableCell>
                      <TableCell align="right">Ações</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {messages.map((msg) => (
                      <TableRow
                        key={msg.id}
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                          "&:hover": {
                            backgroundColor: HOVER_BG,
                          },
                          opacity: msg.is_read ? 0.6 : 1,
                        }}
                      >
                        <TableCell>
                          {new Date(msg.created_at).toLocaleString()}
                        </TableCell>
                        <TableCell>{msg.name}</TableCell>
                        <TableCell>{msg.email}</TableCell>
                        <TableCell sx={{ whiteSpace: "pre-wrap", maxWidth: 400 }}>
                          {msg.message}
                        </TableCell>
                        <TableCell align="right">
                          <Tooltip
                            title={
                              msg.is_read
                                ? "Marcar como não lida"
                                : "Marcar como lida"
                            }
                          >
                            <IconButton
                              size="small"
                              onClick={() => toggleReadStatus(msg)}
                              sx={{ color: TEXT_PRIMARY }}
                            >
                              {msg.is_read ? (
                                <MarkAsUnreadIcon fontSize="small" />
                              ) : (
                                <MarkAsReadIcon fontSize="small" />
                              )}
                            </IconButton>
                          </Tooltip>
                          <Tooltip title="Excluir mensagem">
                            <IconButton
                              size="small"
                              onClick={() => confirmDelete(msg.id)}
                              color="error"
                              sx={{ ml: 1 }}
                            >
                              <Trash2Icon fontSize="small" />
                            </IconButton>
                          </Tooltip>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            )}
          </CardContent>
        </Card>

        <Dialog
          open={isConfirmDialogOpen}
          onClose={() => setIsConfirmDialogOpen(false)}
        >
          <DialogTitle id="alert-dialog-title" color="text.primary">
            {"Tem certeza?"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description" color="text.secondary">
              Esta ação não pode ser desfeita. Isso excluirá permanentemente a
              mensagem.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={() => setIsConfirmDialogOpen(false)}
              color="inherit"
              sx={{ color: TEXT_SECONDARY }}
            >
              Cancelar
            </Button>
            <Button
              onClick={handleDeleteConfirmed}
              autoFocus
              variant="contained"
              color="error"
            >
              Excluir
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </MuiThemeProvider>
  );
};

export default MessagesPage;