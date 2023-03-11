import React, { Component } from 'react'
import { Typography, useTheme } from '@mui/material'
import FlexBetween from '../../components/FlexBetween'
import WidgetWrapper from '../../components/WidgetWrapper'


const AdvertWidget = () => {
  const { palette }: any = useTheme();
  const dark = palette.neutral.dark;
  const main = palette.neutral.main;
  const medium = palette.neutral.medium;

    return (
        <WidgetWrapper>
            <FlexBetween>
                <Typography variant="h5" color={dark} fontWeight="500">
                    Sponsored
                </Typography>
                <Typography color={medium} >
                    Create Ad
                </Typography>
            </FlexBetween>
            <img 
                width="100%"
                height="auto"
                alt="Advert"
                src="http://localhost:3001/assets/os-create-header.jpg"
                style={{ borderRadius: "0.75rem", marginTop: "0.75rem 0" }}
            />
            <FlexBetween>
                <Typography color={main}>
                    OpenScreen
                </Typography>
                <Typography color={medium}>
                    openscreen.com
                </Typography>
            </FlexBetween>
            <Typography color={medium} margin="0.5rem 0">
                Openscreen transforms supply chain, e-commerce, and customer engagement processes with end-to-end QR Code enabled solutions.
            </Typography>
        </WidgetWrapper>
    )
}

export default AdvertWidget