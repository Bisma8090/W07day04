'use client';

import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import Image from 'next/image';

export default function HeroSection() {
  return (
    <Box sx={{ width: '100%', maxWidth: '1400px', margin: '0 auto' }}>

      {/* ── MOBILE LAYOUT ── */}
      <Box sx={{ display: { xs: 'flex', md: 'none' }, flexDirection: 'column' }}>
        {/* Top: hero image grid */}
        <Box sx={{ width: '100%', height: '220px', position: 'relative', overflow: 'hidden' }}>
          <Image
            src="/hero.png"
            alt="Nike 50th Anniversary"
            fill
            style={{ objectFit: 'cover' }}
            priority
          />
        </Box>

        {/* Bottom: black content block */}
        <Box
          sx={{
            bgcolor: 'black',
            color: 'white',
            px: '20px',
            py: '24px',
            display: 'flex',
            flexDirection: 'column',
            gap: 1.5,
          }}
        >
          <Typography
            variant="h2"
            sx={{
              fontWeight: 900,
              fontStyle: 'italic',
              textTransform: 'uppercase',
              fontSize: '1.6rem',
              lineHeight: 1,
              fontFamily: 'var(--font-montserrat)',
            }}
          >
            We Are Never Done
          </Typography>

          <Typography
            variant="body2"
            sx={{ fontSize: '0.85rem', fontWeight: 700, lineHeight: 1.5, opacity: 0.9 }}
          >
            Celebrating 50 years of Nike from May 16th! Exclusive products,
            experiences and much more await you for five days. Scan and join the Nike app!
          </Typography>

          <Button
            variant="contained"
            sx={{
              bgcolor: 'white',
              color: 'black',
              borderRadius: '12px',
              px: 4,
              py: 1,
              fontWeight: 700,
              width: 'fit-content',
              fontSize: '0.85rem',
              mt: 1,
              '&:hover': { bgcolor: '#e0e0e0' },
            }}
          >
            Celebrate with us
          </Button>
        </Box>
      </Box>

      {/* ── DESKTOP LAYOUT ── */}
      <Box
        sx={{
          display: { xs: 'none', md: 'block' },
          width: '100%',
          height: '300px',
          position: 'relative',
          overflow: 'hidden',
          bgcolor: 'black',
        }}
      >
        <Image
          src="/hero.png"
          alt="Nike 50th Anniversary"
          fill
          style={{ objectFit: 'cover', zIndex: 0 }}
          priority
        />

        <Box
          sx={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            paddingLeft: '60px',
            color: 'white',
            zIndex: 1,
            background: 'linear-gradient(to right, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0) 80%)',
          }}
        >
          <Typography
            variant="h2"
            sx={{
              fontWeight: 900,
              fontStyle: 'italic',
              textTransform: 'uppercase',
              fontSize: '2.5rem',
              lineHeight: 0.9,
              mb: 1.5,
              fontFamily: 'var(--font-montserrat)',
            }}
          >
            We Are Never Done
          </Typography>

          <Typography
            variant="body2"
            sx={{
              maxWidth: '540px',
              mb: 3,
              fontSize: '1.2rem',
              fontWeight: 900,
              lineHeight: 1.4,
              opacity: 0.9,
            }}
          >
            Celebrating 50 years of Nike from May 16th! Exclusive products,
            experiences and much more await you for five days. Scan and join the Nike app!
          </Typography>

          <Button
            variant="contained"
            sx={{
              bgcolor: 'white',
              color: 'black',
              borderRadius: '12px',
              px: 4,
              py: 1,
              fontWeight: 700,
              width: 'fit-content',
              fontSize: '0.75rem',
              '&:hover': { bgcolor: '#e0e0e0' },
            }}
          >
            Celebrate with us
          </Button>
        </Box>

        {/* QR code - desktop only */}
        <Box
          sx={{
            position: 'absolute',
            top: '30px',
            right: { md: '10%', lg: '25%' },
            width: '90px',
            height: '90px',
            bgcolor: 'white',
            p: '5px',
            borderRadius: '4px',
            zIndex: 2,
          }}
        >
          <Box
            sx={{
              width: '100%',
              height: '100%',
              backgroundImage: 'url(/qr-code.png)',
              backgroundSize: 'cover',
            }}
          />
        </Box>
      </Box>

      {/* Ticker tape */}
      <Box
        sx={{
          width: '100%',
          height: '40px',
          position: 'relative',
          borderTop: '1px solid #e0e0e0',
          borderBottom: '1px solid #e0e0e0',
          overflow: 'hidden',
          display: 'flex',
          alignItems: 'center',
          bgcolor: 'white',
        }}
      >
        <Image src="/img.gif" alt="Nike Ticker Tape" fill style={{ objectFit: 'contain' }} />
      </Box>
    </Box>
  );
}
