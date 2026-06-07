import ReactMarkdown from 'react-markdown';
import styles from './DynamicMarkdownContent.module.scss';

function DynamicMarkdownContent({ content }: { content: string }) {
  const formattedContent = content.replace(
    /(ГОСТ(?:\s+Р)?(?:\s+ИСО)?\s+[\d.-]+(?:\s+«[^»]+»)?)([^.]*\.)/g,
    '**$1**$2'
  );

  return (
    <div className={styles.markdown_content}>
      <ReactMarkdown>{formattedContent}</ReactMarkdown>
    </div>
  );
}

export default DynamicMarkdownContent;