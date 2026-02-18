<script lang="ts">
  import { enhance } from "$app/forms";
  
  export let data;

  let previewUrl: string | null = null;

  function handleFileChange(event: Event) {
    const files = (event.target as HTMLInputElement).files;
    if (files && files[0]) {
      previewUrl = URL.createObjectURL(files[0]);
    } else {
      previewUrl = null;
    }
  }

  function removePreview(){
    previewUrl = null;
  }

</script>

<div class="profile-container">
  <h1>Profile</h1>
  
  <div class="user-info">
    <p><strong>Name:</strong> {data.user.username || "N/A"}</p>
    <p><strong>Email:</strong> {data.user?.email || "N/A"}</p>
  </div>

  <div class="current-profile-picture">
    <h2>Current Profile Picture</h2>
    {#if data.user?.profilePicture}
      <img src={data.user.profilePicture} alt={data.user.username} style="max-width:300px;max-height:300px;border-radius:8px" />
    {:else}
      <p>No profile picture uploaded yet.</p>
    {/if}
  </div>

  <div class="upload-section">
    <h2>Upload New Profile Picture</h2>
    <form method="POST" action="?/upload" enctype="multipart/form-data" use:enhance>
      <input type="file" name="image" accept="image/*" on:change={handleFileChange} required />
      <button type="submit" on:submit={() => removePreview()}>Upload Image</button>
    </form>

    {#if previewUrl}
      <div class="preview">
        <h3>Preview</h3>
        <img src={previewUrl} alt="Preview" style="max-width:200px;max-height:200px;border-radius:8px" />
      </div>
    {/if}
  </div>
</div>

<style>
  .profile-container {
    max-width: 600px;
    margin: 0 auto;
    padding: 2rem;
  }

  .user-info, .current-profile-picture, .upload-section {
    margin-bottom: 2rem;
    padding: 1rem;
    border: 1px solid #ddd;
    border-radius: 8px;
  }

  .preview {
    margin-top: 1rem;
  }

  button {
    padding: 0.5rem 1rem;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 1rem;
  }

  button:hover {
    background-color: #0056b3;
  }

  input[type="file"] {
    margin-right: 1rem;
  }
</style>