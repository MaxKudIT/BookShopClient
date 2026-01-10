export const buttonStyles = {
  width: '100%',
  height: 30,
  textTransform: 'none',
  borderRadius: 2,
  fontSize: '15px',
  color: 'rgba(255,255,255,0.9)',
  boxShadow: 'none',
  position: 'relative',

  background: 'rgba(18, 9, 56, 0.3)',
  border: '1px solid rgba(68, 9, 146, 0.6)',
  display: 'flex',
  columnGap: 1,
  '&.Mui-disabled': {
    background: 'rgba(18, 9, 56, 0.15)',
    border: '1px solid rgba(68, 9, 146, 0.3)',
    color: 'rgba(255,255,255,0.4)',
    cursor: 'not-allowed',
  }
}