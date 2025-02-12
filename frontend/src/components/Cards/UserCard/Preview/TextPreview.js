import Image from "next/image";
import { IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import CustomerModal from "@/components/Modals";

const TextPreview = (props) => {
  const { name, avatar, content, file, open, setOpen } = props;
  console.log('TextPreview', props);

  const handleClose = () => setOpen(false);

  const textContent = (
    <div className="videoPreviewContainer">
      <div className="spaceBetween">
        <p
          className="cardBigTitle"
          style={{ color: "var(--secondaryWhiteColor)" }}
        >
          {name}
        </p>
        <button className="closeButton" onClick={handleClose}>
          <span className="closeIcon">&times;</span>
        </button>
      </div>
      <div style={{ marginTop: "20px", textAlign: 'center' }}>
        {file && <><Image
          width={500} // Default width
          height={300} // Default height
          style={{ maxHeight: "300px", width: "auto", height: "100%" }}
          src={file}
          alt={file}
          unoptimized={true}
        /></>}
      </div>
      <div className="videoPreviewDescription">{content}</div>
    </div>
  );

  return <CustomerModal open={open} setOpen={setOpen} content={textContent} />;
};

export default TextPreview;
