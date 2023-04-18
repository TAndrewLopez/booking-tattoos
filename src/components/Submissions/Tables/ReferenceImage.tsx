import { type Dispatch, type SetStateAction } from "react";

interface ReferenceImageProps {
  editEnabled: boolean | null;
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
