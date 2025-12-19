export const textFieldStyles = {
  height: 43,
  
    
  '& .MuiOutlinedInput-root': {   
    height: '100%',
    
        '& .MuiInputBase-input': {
      color: 'white', 
      fontSize: '14px',
      fontWeight: 400,
      
 
        },

    '& .MuiInputAdornment-positionStart': {
      color: 'white',
    },
    
    '& .MuiInputAdornment-positionEnd': {
      color: 'white',
    },
     '& fieldset': {
    borderColor: '#CCCCCC',
    
  },
     '&:hover': {
      '& fieldset': {
        borderColor: 'white'
      },
    },
     '&.Mui-focused': {
      '& fieldset': {
        borderColor: 'white',
        borderWidth: 2,
      },

   },
},

 '& .MuiInputLabel-root': {
    color: 'white !important',

    
  },

};

export const buttonStyles = {
  width: '100%',
  height: 45,
   textTransform: 'none',
  borderRadius: 2,
  fontSize: '15px',
  fontWeight: 'bold',
  color: '#2735f7ff',
  
  position: 'relative',

   background: `
    linear-gradient(145deg, 
      rgba(204, 202, 235, 1) 0%, 
      rgba(255, 255, 255, 1) 30%, 
      rgba(201, 198, 233, 1) 90%
    )
  `,
  
 
 
}