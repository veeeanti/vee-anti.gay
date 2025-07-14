module.exports = {
  apps: [
    {
      name: "VA-Production",
      script: "pnpm",
      args: "run start",
      env: {
        PORT: 6969
      },
      cwd: "/root/Documents/vee-anti.xyz"
    }
  ]
};
