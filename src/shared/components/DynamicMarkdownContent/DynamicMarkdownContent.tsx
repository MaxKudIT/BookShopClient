import ReactMarkdown from 'react-markdown';

function DynamicMarkdownContent({ content }: {content: string}) {

  const formatContent = (text: string) => {
    if (!text) return text;
    
    const gostRegex = /(ГОСТ(?:\s+Р)?(?:\s+ИСО)?\s+[\d.-]+(?:\s+«[^»]+»)?[^.]*\.)/g;
    const matches = text.match(gostRegex);
    
    if (!matches || matches.length === 0) {

      return text;
    }
    

    let formatted = text;
    
  
    matches.forEach((gost, index) => {

      formatted = formatted.replace(
        gost, 
        `\n\n- **${gost.trim()}**`
      );
    });
    
    return formatted;
  };

  const formattedContent = formatContent(content);

  return (
    <div style={{ color: 'white', opacity: 0.9, letterSpacing: 0.2, lineHeight: 1.5 }}>
      <ReactMarkdown
        components={{
          p: ({ node, ...props }) => <p style={{ marginBottom: '12px' }} {...props} />,
          strong: ({ node, ...props }) => <strong style={{ fontWeight: 600 }} {...props} />,
          ul: ({ node, ...props }) => <ul style={{ 
            marginLeft: '20px', 
            marginBottom: '16px',
            paddingLeft: '0',
            listStyleType: 'disc'
          }} {...props} />,
          li: ({ node, ...props }) => <li style={{ marginBottom: '16px', lineHeight: 1.5 }} {...props} />,
        }}
      >
        {formattedContent}
      </ReactMarkdown>
    </div>
  );
}

export default DynamicMarkdownContent;