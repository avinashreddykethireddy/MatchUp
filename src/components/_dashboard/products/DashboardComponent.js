import React from 'react';
import { motion } from 'framer-motion';
import { MotionContainer, varBounceIn } from '../../animate';

import { Box } from '@material-ui/core';


export default function DashboardComponent(){
    return (
        <motion.div variants={varBounceIn}>
        <Box
          component="img"
          src="/static/illustrations/illustration_dashboard.svg"
          sx={{ height: 400, mx: 'auto' }}
        />
      </motion.div>

    )
}