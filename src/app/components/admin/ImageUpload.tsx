"use client";

import React, { useState, useEffect, useRef } from "react";
import { Button, Box, Typography, IconButton } from "@mui/material";
import {
  CloudUpload as CloudUploadIcon,
  Delete as DeleteIcon,
} from "@mui/icons-material";
import Image from "next/image";

interface ImageUploadProps {
  initialImageUrls?: string[]; // URLs de imagens já existentes
  onImageUrlsChange: (urls: string[]) => void; // Callback para URLs de imagens existentes que foram mantidas
  onNewFilesChange: (files: File[]) => void; // Callback para novos arquivos selecionados
  multiple?: boolean; // Permite múltiplos arquivos
  label?: string; // Rótulo para o input
  folder?: string; // Pasta de destino no Supabase Storage (apenas para referência visual, o upload é feito no pai)
}

const ImageUpload: React.FC<ImageUploadProps> = ({
  initialImageUrls = [],
  onImageUrlsChange,
  onNewFilesChange,
  multiple = false,
  label = "Upload de Imagens",
}) => {
  const [currentImageUrls, setCurrentImageUrls] =
    useState<string[]>(initialImageUrls);
  const [newFiles, setNewFiles] = useState<File[]>([]);
  const [newFilePreviews, setNewFilePreviews] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setCurrentImageUrls(initialImageUrls);
  }, [initialImageUrls]);

  useEffect(() => {
    // Limpa as URLs de pré-visualização quando os novos arquivos mudam
    return () => {
      newFilePreviews.forEach((url) => URL.revokeObjectURL(url));
    };
  }, [newFilePreviews]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const filesArray = Array.from(event.target.files);

      if (!multiple) {
        // Se não for múltiplo, substitui os arquivos existentes
        setNewFiles(filesArray);
        setNewFilePreviews(filesArray.map((file) => URL.createObjectURL(file)));
      } else {
        // Se for múltiplo, adiciona aos arquivos existentes
        setNewFiles((prev) => [...prev, ...filesArray]);
        setNewFilePreviews((prev) => [
          ...prev,
          ...filesArray.map((file) => URL.createObjectURL(file)),
        ]);
      }
      onNewFilesChange(multiple ? [...newFiles, ...filesArray] : filesArray);
    }
  };

  const handleRemoveNewFile = (indexToRemove: number) => {
    const updatedNewFiles = newFiles.filter(
      (_, index) => index !== indexToRemove
    );
    const updatedNewFilePreviews = newFilePreviews.filter(
      (_, index) => index !== indexToRemove
    );
    setNewFiles(updatedNewFiles);
    setNewFilePreviews(updatedNewFilePreviews);
    onNewFilesChange(updatedNewFiles);
  };

  const handleRemoveExistingImage = (urlToRemove: string) => {
    const updatedExistingUrls = currentImageUrls.filter(
      (url) => url !== urlToRemove
    );
    setCurrentImageUrls(updatedExistingUrls);
    onImageUrlsChange(updatedExistingUrls);
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  return (
    <Box sx={{ mb: 2 }}>
      <Typography variant="body2" sx={{ mb: 1, color: "text.primary" }}>
        {label}
      </Typography>
      <input
        type="file"
        accept="image/*"
        multiple={multiple}
        onChange={handleFileChange}
        ref={fileInputRef}
        style={{ display: "none" }}
      />
      <Button
        variant="outlined"
        startIcon={<CloudUploadIcon />}
        onClick={triggerFileInput}
        fullWidth
        sx={{
          borderColor: "text.secondary",
          color: "text.primary",
          "&:hover": {
            borderColor: "text.primary",
            bgcolor: "rgba(255,255,255,0.08)",
          },
        }}
      >
        Selecionar {multiple ? "Imagens" : "Imagem"}
      </Button>

      <Box sx={{ mt: 2, display: "flex", flexWrap: "wrap", gap: 2 }}>
        {/* Pré-visualização de imagens existentes */}
        {currentImageUrls.map((url, index) => (
          <Box
            key={`existing-${index}`}
            sx={{
              position: "relative",
              width: 100,
              height: 100,
              borderRadius: 1,
              overflow: "hidden",
              border: "1px solid #555",
            }}
          >
            <Image
              src={url}
              alt={`Existing image ${index}`}
              layout="fill"
              objectFit="cover"
            />
            <IconButton
              size="small"
              sx={{
                position: "absolute",
                top: 4,
                right: 4,
                bgcolor: "rgba(0,0,0,0.6)",
                color: "white",
                "&:hover": { bgcolor: "rgba(0,0,0,0.8)" },
              }}
              onClick={() => handleRemoveExistingImage(url)}
            >
              <DeleteIcon fontSize="small" />
            </IconButton>
          </Box>
        ))}

        {/* Pré-visualização de novas imagens selecionadas */}
        {newFilePreviews.map((previewUrl, index) => (
          <Box
            key={`new-${index}`}
            sx={{
              position: "relative",
              width: 100,
              height: 100,
              borderRadius: 1,
              overflow: "hidden",
              border: "1px solid #555",
            }}
          >
            <Image
              src={previewUrl}
              alt={`New image ${index}`}
              layout="fill"
              objectFit="cover"
            />
            <IconButton
              size="small"
              sx={{
                position: "absolute",
                top: 4,
                right: 4,
                bgcolor: "rgba(0,0,0,0.6)",
                color: "white",
                "&:hover": { bgcolor: "rgba(0,0,0,0.8)" },
              }}
              onClick={() => handleRemoveNewFile(index)}
            >
              <DeleteIcon fontSize="small" />
            </IconButton>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default ImageUpload;