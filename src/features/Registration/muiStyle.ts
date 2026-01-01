export const textFieldStyles = {
    height: 43,
    '& .MuiInputBase-root': {   
        height: '100%',
         '&:-webkit-autofill': {
        WebkitTextFillColor: 'white',
        WebkitBoxShadow: '0 0 0px 1000px transparent inset',
        transition: 'background-color 5000s ease-in-out 0s',
      },
      
      '&:-webkit-autofill:hover': {
        WebkitTextFillColor: 'white',
        WebkitBoxShadow: '0 0 0px 1000px transparent inset',
      },
      
      '&:-webkit-autofill:focus': {
        WebkitTextFillColor: 'white',
        WebkitBoxShadow: '0 0 0px 1000px transparent inset',
      },
    },
    
    
};

export const buttonStyles = {
  width: '100%',
  height: 45,
  boxShadow: 'none',
  borderRadius: 2,
  letterSpacing: 0.7,
   textTransform: 'none',
     fontSize: '14px',
  fontWeight: 'bold',
  background: `
    linear-gradient(145deg, 
      rgba(8, 29, 134, 1) 0%, 
      rgba(42, 67, 201, 1) 30%, 
      rgba(72, 12, 184, 1) 70%
    )
  `,
  color: 'white',
  
  position: 'relative',

 
  
 
 
}