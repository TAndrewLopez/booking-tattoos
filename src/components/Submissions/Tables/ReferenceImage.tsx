import { type Dispatch, type SetStateAction } from "react";
import { FiTrash } from "react-icons/fi";

interface ReferenceImageProps {
  editEnabled: boolean | null;
  setImage: Dispatch<SetStateAction<File | null>>;
  uploadImage: () => Promise<void>;
  deleteImage: () => Promise<void>;
  imageURL: string | null;
}

const ReferenceImage: React.FC<ReferenceImageProps> = ({
  editEnabled,
  setImage,
  uploadImage,
  deleteImage,
  imageURL,
}) => {
  return (
    <>
      <div className="flex w-full items-center justify-between">
        <h2 className="mb-2">Reference Image:</h2>
        <button
          onClick={() => void deleteImage()}
          disabled={!imageURL || !editEnabled}
        >
          {imageURL && (
            <FiTrash
              size={18}
              className={editEnabled ? "text-neutral-700" : "text-neutral-400"}
            />
          )}
        </button>
      </div>
      {imageURL ? (
        <>
          <a
            className="truncate text-blue-500 hover:text-blue-700 hover:underline"
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
              <tr className="flex flex-col gap-2 md:flex-row md:justify-between">
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
                <td className="md:text-right">
                  <button
                    className="rounded-md bg-sky-200 px-2 py-1 text-sky-900 hover:bg-sky-900 hover:text-white disabled:cursor-not-allowed disabled:bg-neutral-400 disabled:text-neutral-50"
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
