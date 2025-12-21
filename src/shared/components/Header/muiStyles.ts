import { PiX } from "react-icons/pi";

export const textFieldStyles = {
  height: 50,
  width: '65%',
  '& .MuiFilledInput-root': {   
    height: '100%',
    backgroundColor: 'rgba(255, 255, 255, 0.9)', 
    borderRadius: 3, 
    
 
    '&:before, &:after, &:hover:before, &.Mui-focused:after': {
      border: 'none',
      display: 'none', 
    },

    '&:hover': {
      backgroundColor: 'rgba(231, 230, 230, 0.9)', 
    },
    
    '&.Mui-focused': {
      backgroundColor: '#ffffff',
     
    },
    
  },
  '& .MuiFilledInput-input': {
    color: '#333333', 
    fontSize: '14px',
    fontWeight: 400,

  },
  '& .Mui-focused': {
  '& .MuiInputAdornment-root': {
    '& svg': {
        color: '#0e7ac2ff !important'
    },
  },
},
  '& .MuiInputAdornment-root': {
    '& svg': {
      color: '#666666', 
    },
     '&.Mui-focused': {
      color: 'red !important', 
    },
  },
  
  '& .MuiInputLabel-root': {
    color: '#666666 !important',
    fontSize: 14,
    '&.Mui-focused': {
      color: '#0e7ac2ff !important', 
    },
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
      backgroundColor: '#FFFFFF', 
      borderRadius: '8px',
        fontSize: 15,
      width: '100%',
      '&:hover': {
        backgroundColor: 'rgba(231, 230, 230, 0.9)',
        '& .MuiOutlinedInput-notchedOutline': {
          borderColor: '#BDBDBD',
        },
      },
      
      '&.Mui-focused': {
        backgroundColor: '#FFFFFF !important',
        boxShadow: '0 0 0 2px rgba(13, 71, 161, 0.2)',
        '& .MuiOutlinedInput-notchedOutline': {
       
          borderWidth: 0,
        },
      },
    },
  },
  
  inputLabel: {
    color: '#666666',
    fontSize: 15,
    '&.Mui-focused': {
      color: '#0D47A1', 
      fontWeight: 600,
    }
  },
  
  select: {

    backgroundColor: '#FFFFFF',
    borderRadius: '8px',
    width: 300,
    color: '#0D47A1', 
    fontWeight: 500,
    
    '&:before, &:after': { 
      display: 'none' 
    },
    
    '& .MuiSelect-select': {
      padding: '12px 14px',
      color: '#0D47A1',
      
      '&:hover': {
        backgroundColor: 'rgba(13, 71, 161, 0.04)', 
        borderRadius: '8px',
      },
      
      '&:focus': {
        backgroundColor: 'rgba(13, 71, 161, 0.08)',
        borderRadius: '8px',
      }
    },
    
 
    '& .MuiSelect-icon': {
      color: '#0D47A1', 
    },
  },

  menuPaper: {
    marginTop: '8px',
    borderRadius: '8px',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',

    '& .MuiMenuItem-root': {
      color: '#333333',
      padding: '10px 16px',
          fontSize: 15,
      '&:hover': {
        backgroundColor: 'rgba(13, 71, 161, 0.04)',
      },
      
      '&.Mui-selected': {
        backgroundColor: 'rgba(13, 71, 161, 0.08)',
        color: '#0D47A1',
        fontWeight: 500,
        
        '&:hover': {
          backgroundColor: 'rgba(13, 71, 161, 0.12)',
        },
      },
    },
  }
};