import { useEffect, useState } from "react";
import ColorThief from 'colorthief';

const useDominantColor = (imageUrl: string | null | undefined) => {
  const [dominantColor, setDominantColor] = useState<string>('#c386ebff'); // ваш цвет по умолчанию
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
  
    if (!imageUrl || typeof imageUrl !== 'string') {
      setLoading(false);
      return;
    }

    setLoading(true);

    const img = new Image();
    img.crossOrigin = 'Anonymous';
    img.src = imageUrl;

    img.onload = () => {
      try {
        // Убеждаемся, что изображение загружено
        if (img.complete && img.naturalWidth > 0) {
          const colorThief = new ColorThief();
          const [r, g, b] = colorThief.getColor(img);
          setDominantColor(`rgb(${r}, ${g}, ${b})`);
        }
      } catch (error) {
        console.error('Error extracting color:', error);
        // Оставляем цвет по умолчанию
      } finally {
        setLoading(false);
      }
    };

    img.onerror = () => {
      console.warn('Failed to load image:', imageUrl);
      setLoading(false);
    };

   
    return () => {
      img.onload = null;
      img.onerror = null;
    };
  }, [imageUrl]);

  return { dominantColor, loading };
};

export default useDominantColor;