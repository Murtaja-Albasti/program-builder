<template>
    <div class="input-bar">
      <input
        type="text"
        v-model="projectName"
        placeholder="Enter project name"
        class="input"
      />
      <button @click="createProject" class="bg-black text-white px-4 py-2 rounded">
        Create Project
      </button>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        projectName: '',
      };
    },
    methods: {
      async createProject() {
        if (!this.projectName.trim()) {
          alert('Please enter a valid project name.');
          return;
        }
        try {
          const result = await window.electronAPI.createNuxtProject(this.projectName);
          alert(`Project created successfully! URL: ${result.url}`);
        } catch (error) {
          console.error('Error creating project:', error);
          alert('Failed to create project.');
        }
      },
    },
  };
  </script>
  
  <style>
  .input-bar {
    display: flex;
    gap: 10px;
    margin-top: 20px;
  }
  .input {
    flex: 1;
    padding: 10px;
    font-size: 16px;
  }
  .button {
    padding: 10px 20px;
    font-size: 16px;
    cursor: pointer;
  }
  </style>
  