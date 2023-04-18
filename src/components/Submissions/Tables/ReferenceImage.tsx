import { type Dispatch, type SetStateAction } from "react";

interface ReferenceImageProps {
  editEnabled: boolean;
  setImage: Dispatch<SetStateAction<File | null>>;
  uploadImage: () => Promise<void>;
  imageURL: string | null;
}

const ReferenceImage: React.FC<ReferenceImageProps> = ({
  editEnabled,
  setImage,
  uploadImage,
  imageURL,
}) => {
  return (
    <>
      <h2>Reference Image:</h2>
      {imageURL ? (
        <>
          <a
            className="hover:text-underline truncate text-blue-500"
            href="#"
            onClick={() => window.open(imageURL, "_blank")}
          >
            {imageURL}
          </a>
        </>
      ) : (
        <>
          <table>
            <tbody>
              <tr>
                <td>
                  <input
                    type="file"
                    disabled={!editEnabled}
                    onChange={({ target }) => {
                      if (!target.files) return;
                      if (!target.files[0]) return;
                      setImage(target.files[0]);
                    }}
                  />
                </td>
                <td className="text-right">
                  <button
                    className="rounded-md bg-sky-200 px-2 py-1 text-sky-900 hover:bg-sky-900 hover:text-white disabled:cursor-not-allowed"
                    disabled={!editEnabled}
                    onClick={() => void uploadImage()}
                  >
                    Upload Image
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </>
      )}
    </>
  );
};

export default ReferenceImage;
