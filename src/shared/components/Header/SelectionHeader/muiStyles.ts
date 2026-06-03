export const textFieldStyles = {
  height: 50,
  width: '100%',
  maxWidth: 600,
  '& .MuiFilledInput-root': {   
    height: '100%',
    backgroundColor: 'rgba(91, 95, 102, 0.1)', 
    borderRadius: 3, 
    
 
    '&:before, &:after, &:hover:before, &.Mui-focused:after': {
      border: 'none',
      display: 'none', 
    },

    

    '&:hover': {
      backgroundColor: 'rgba(153, 175, 212, 0.1)', 
    },
    
    '&.Mui-focused': {
      backgroundColor: 'rgba(153, 175, 212, 0.1)',
     
    },
    
  },
  '& .MuiFilledInput-input': {
    color: 'rgba(255,255,255,0.9)', 
    fontSize: '12px',
    fontWeight: 400,
    

  },
 
  '& .MuiInputAdornment-root': {
    '& svg': {
      color: '#666666', 
    },
   
  },
  
  '& .MuiInputLabel-root': {
    color: '#666666 !important',
    fontSize: 14,
   
  },

  '& .MuiFormHelperText-root': {
    color: '#666666',
    fontSize: '12px',
    
    '&.Mui-error': {
      color: '#d32f2f',
    },
  },
  
};




export const selectStyles = {
  formControl: {
    width: 250,
    
    '& .MuiOutlinedInput-root': {
      backgroundColor: 'rgba(255, 255, 255, 0.1)', 
      borderRadius: '8px',
        fontSize: 14,
      width: '100%',
      '&:hover': {
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        '& .MuiOutlinedInput-notchedOutline': {
          border: 'none',
        },
      },
      
      '&.Mui-focused': {
        backgroundColor: 'rgba(255, 255, 255, 0.2) !important',
        boxShadow: 'none',
        '& .MuiOutlinedInput-notchedOutline': {
       
          borderWidth: 0,
        },
      },
    },
  },
  
  inputLabel: {
    color: '#666666',
    fontSize: 14,
    '&.Mui-focused': {
      color: 'rgba(255,255,255,0.9)', 
   
    }
  },
  
  select: {

    backgroundColor: 'rgba(255,255,255,0.1)',
    
    borderRadius: '8px',
    width: 300,
    color: 'rgba(255,255,255,0.9)', 

    
    '&:before, &:after': { 
      display: 'none' 
    },
    
    '& .MuiSelect-select': {
      padding: '12px 14px',
      color: 'rgba(255,255,255,0.9)',
      
      '&:hover': {
        backgroundColor: 'rgba(85, 70, 117, 0.9)', 
        borderRadius: '8px',
      },
      
      '&:focus': {
        backgroundColor: 'rgba(13, 71, 161, 0.08)',
        borderRadius: '8px',
      }
    },
    
 
    '& .MuiSelect-icon': {
      color: 'rgba(255,255,255,0.9)', 
    },
  },

  menuPaper: {
    marginTop: '8px',

    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
    background: 'rgba(95, 97, 134, 1)',
    
    '& .MuiMenuItem-root': {
      color: 'rgba(255,255,255, 1)',
      borderBottom: '1px solid rgba(86, 86, 112, 0.7)',
      padding: '10px 16px',
          fontSize: 14,
      '&:hover': {
        backgroundColor: 'rgba(255,255,255,0.2)',
      },
      
      '&.Mui-selected': {
        backgroundColor: 'rgba(82, 72, 104, 0.9) !important',
        color: '#ffffffff',

        '&:hover': {
          backgroundColor: 'rgba(62, 29, 139, 0.4) !important',
        },
      },
    },
  }
};
