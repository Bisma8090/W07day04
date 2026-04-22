'use client';

import React, { useState } from 'react';
import {
  Card,
  CardContent,
  Typography,
  Box,
  IconButton,
  Snackbar,
  Alert,
} from '@mui/material';
import { Product, useAddToCartMutation } from '@/services/api';

interface ProductCardProps {
  product: Product;
  variant?: 0 | 1 | 2;
}

export default function ProductCard({
  product,
  variant = 0,
}: ProductCardProps) {
  const [addToCart, { isLoading }] = useAddToCartMutation();
  const [snackOpen, setSnackOpen] = useState(false);

  const handleAddToCart = async () => {
    try {
      await addToCart({
        productId: product.id,
        name: product.name,
        price: product.discount ?? product.price,
        image: product.image?.url ?? '',
        quantity: 1,
      }).unwrap();

      setSnackOpen(true);
    } catch (err) {
      console.error('Failed to add to cart:', err);
    }
  };

  const rotations = ['-10deg', '-20deg', '-4.03deg'];
  const rotate = rotations[variant];

  return (
    <>
      {/* ── MOBILE CARD: horizontal layout ── */}
      <Card
        sx={{
          display: { xs: 'flex', md: 'none' },
          width: '100%',
          height: 160,
          borderRadius: '18px',
          position: 'relative',
          overflow: 'hidden',
          bgcolor: '#EFEFEF',
          boxShadow: 'none',
          flexDirection: 'row',
          alignItems: 'center',
        }}
      >
        {/* Left: text + button */}
        <Box sx={{ flex: 1, pl: 2, pr: 1, zIndex: 1 }}>
          <Typography
            sx={{
              fontWeight: 800,
              fontSize: '0.65rem',
              color: '#e53935',
              fontStyle: 'italic',
              textTransform: 'uppercase',
              mb: 0.5,
            }}
          >
            NEW
          </Typography>
          <Typography
            sx={{
              fontWeight: 700,
              fontSize: '0.75rem',
              lineHeight: 1.2,
              textTransform: 'uppercase',
              color: '#111',
              mb: 0.5,
            }}
          >
            {product.name}
          </Typography>
          <Typography sx={{ fontSize: '0.7rem', color: '#555', mb: 1 }}>
            {product.discount && product.discount < product.price
              ? `$${product.discount}`
              : `$${product.price}`}
          </Typography>
          <IconButton
            onClick={handleAddToCart}
            disabled={isLoading}
            size="small"
            sx={{
              width: 32,
              height: 32,
              borderRadius: '50%',
              bgcolor: '#fff',
              '&:hover': { bgcolor: '#333' },
            }}
          >
            <Box
              component="img"
              src="/Group (2).png"
              alt="Add to cart"
              sx={{ width: 18, height: 18, objectFit: 'contain' }}
            />
          </IconButton>
        </Box>

        {/* Right: shoe image */}
        <Box
          sx={{
            width: '160px',
            height: '100%',
            position: 'relative',
            flexShrink: 0,
            overflow: 'visible',
          }}
        >
          {product.image?.url && (
            <Box
              component="img"
              src={product.image.url}
              alt={product.name}
              sx={{
                width: '180px',
                height: '140px',
                objectFit: 'contain',
                position: 'absolute',
                right: '-10px',
                top: '50%',
                transform: `translateY(-50%) rotate(${rotate})`,
                filter: 'drop-shadow(0px 8px 16px rgba(0,0,0,0.18))',
              }}
            />
          )}
        </Box>
      </Card>

      {/* ── DESKTOP CARD: original vertical layout ── */}
      <Card
        sx={{
          display: { xs: 'none', md: 'flex' },
          width: '100%',
          height: 580,
          borderRadius: '18px',
          position: 'relative',
          overflow: 'hidden',
          bgcolor: '#EFEFEF',
          boxShadow: 'none',
          flexDirection: 'column',
          transition: 'transform 0.25s ease, box-shadow 0.25s ease',
          '&:hover': {
            transform: 'translateY(-4px)',
            boxShadow: '0 16px 40px rgba(0,0,0,0.12)',
          },
        }}
      >
        <Typography
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%) rotate(-90deg)',
            fontFamily: 'Arial, sans-serif',
            fontWeight: 900,
            fontStyle: 'italic',
            fontSize: '140px',
            color: 'rgba(0,0,0,0.07)',
            userSelect: 'none',
            pointerEvents: 'none',
            zIndex: 0,
            whiteSpace: 'nowrap',
          }}
        >
          NIKE
        </Typography>

        <Box
          sx={{
            position: 'relative',
            flex: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            overflow: 'hidden',
            zIndex: 1,
          }}
        >
          {product.image?.url ? (
            <Box
              component="img"
              src={product.image.url}
              alt={product.name}
              sx={{
                width: '654px',
                height: '373px',
                objectFit: 'contain',
                position: 'absolute',
                left: '50%',
                top: '50%',
                transform: `translate(-50%, -50%) rotate(${rotate})`,
                filter: 'drop-shadow(0px 20px 40px rgba(0,0,0,0.18))',
                transition: 'transform 0.3s ease',
                '&:hover': {
                  transform: `translate(-50%, -50%) rotate(${rotate}) scale(1.05)`,
                },
              }}
            />
          ) : (
            <Typography variant="caption" color="text.secondary">No image</Typography>
          )}
        </Box>

        <CardContent sx={{ p: 3, zIndex: 1 }}>
          <Typography
            sx={{
              fontWeight: 800,
              fontSize: '1.45rem',
              lineHeight: 1.1,
              mb: 1,
              textTransform: 'uppercase',
              color: '#111',
            }}
          >
            {product.name}
          </Typography>

          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 2 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              {product.discount && product.discount < product.price ? (
                <>
                  <Typography sx={{ fontWeight: 700, fontSize: '0.95rem', color: '#e53935' }}>
                    ${product.discount}
                  </Typography>
                  <Typography sx={{ fontWeight: 400, fontSize: '0.8rem', color: '#999', textDecoration: 'line-through' }}>
                    ${product.price}
                  </Typography>
                </>
              ) : (
                <Typography sx={{ fontWeight: 500, fontSize: '0.95rem', color: '#555' }}>
                  ${product.price}
                </Typography>
              )}
            </Box>

            <IconButton
              onClick={handleAddToCart}
              disabled={isLoading}
              sx={{
                width: 55,
                height: 52.9,
                borderRadius: '50%',
                bgcolor: '#fff',
                '&:hover': { bgcolor: '#333', transform: 'scale(1.1)' },
                transition: 'all 0.2s ease',
              }}
            >
              <Box component="img" src="/Group (2).png" alt="Add to cart" sx={{ width: 28, height: 28, objectFit: 'contain' }} />
            </IconButton>
          </Box>
        </CardContent>
      </Card>

      <Snackbar
        open={snackOpen}
        autoHideDuration={2000}
        onClose={() => setSnackOpen(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert severity="success" sx={{ fontSize: '0.8rem' }}>
          {product.name} added to cart
        </Alert>
      </Snackbar>
    </>
  );
}