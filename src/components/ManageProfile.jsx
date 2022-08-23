import EditorJS from '@editorjs/editorjs';
import { createSignal, onMount } from "solid-js";
import {upsertProfile, getProfileByAuthor} from "../services/ProfileService";
import {getSessionUser} from "../services/AuthService";
import {uploadFile, getPublicUrl} from "../services/FileService";
import styles from "./ManageProfile.module.scss";

export default function ManageProfile() {
  const [id, setId] = createSignal(0);
  const [name, setName] = createSignal("");
  const [link, setLink] = createSignal("");
  const [preview, setPreview] = createSignal("");

  let editor;
  onMount(async () => {
    const {error, data} =  await getProfileByAuthor(getSessionUser().id);
    if (error) return;

    let description = "";

    if (data.length > 0) {
      const values = data[0];
      setId(values.id);
      setName(values.name);
      setLink(values.link);
      description = JSON.parse(values.description);

      if (values.preview) {
        const {publicURL} = await getPublicUrl(values.preview);
        setPreview(publicURL);
      }
    }

    editor = new EditorJS({ 
      holder: "description",
      placeholder: 'Some details about you...',
      data: description
    });
  });

  async function onFileChange(ev) {
    const loggedId = getSessionUser().id;
    if (!loggedId) return;

    const file = ev.target.files[0];
    const name = `/${loggedId}/${file.name}`;
    await uploadFile(name, file);
    await upsertProfile({
      id: id(),
      author_id: loggedId,
      preview: name
    });

    const {publicURL} = await getPublicUrl(name);
    setPreview(publicURL);
  }

  function view() {
    if (!link()) return;
    window.location.href = `/u/${link()}`;
  }

  async function save() {
    const data = await editor.save();
    await upsertProfile({
      id: id(),
      name: name(),
      link: link(),
      description: JSON.stringify(data),
      author_id : getSessionUser().id
    })
  }

  return <div className={styles.manager}>
    {!preview() && <div class={styles.dropzone}>
      <span class="file-msg">Avatar</span>
      <input class="file-input" type="file" onChange={onFileChange} accept="image/png, image/jpeg" />
    </div>}

    {preview() && <img src={preview()} />}

    <input placeholder="Your name..." value={name()} onChange={ev => setName(ev.target.value)} type="text" />
    <input placeholder="Your handle..." value={link()} onChange={ev => setLink(ev.target.value)} type="text" />
    <div id="description"></div>
    
    <footer>
      <button className="btn" onClick={view}>Preview</button>
      <button className="btn primary" onClick={save}>Save</button>
    </footer>
  </div>
}