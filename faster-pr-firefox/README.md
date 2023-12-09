# Installation and Build Scripts README

This README provides information about two shell scripts: `install.sh` and `build.sh`. These scripts are designed to simplify the process of installing and building components of a project. Below, you will find details on each script, including their purpose and usage instructions.

### Prerequisites:
```
    "node": "v20.9.0",
    "npm": "v10.1.0"
```

## 1. `install.sh`

### Purpose:
The `install.sh` script is used to automate the installation of dependencies for different components of a project. It simplifies the setup process by running the necessary commands to install dependencies for specific parts of the project.

### Usage:
1. Open your terminal.
2. Navigate to the root directory of your project where `install.sh` is located.
3. Run the script by executing the following command:

   ```bash
   ./install.sh
   ```

### What it does:
- Enters the `service` directory and runs `npm ci` to install dependencies specific to the service component.
- Goes back to the project's root directory.
- Enters the `react-app` directory and runs `npm ci` to install dependencies for the React application.

After running the script, you will have all the necessary dependencies installed for both the service component and the React application.

## 2. `build.sh`

### Purpose:
The `build.sh` script is used to automate the build process of a project. It simplifies the task of building various parts of the project, making it easier to generate the final project files.

### Usage:
1. Open your terminal.
2. Navigate to the root directory of your project where `build.sh` is located.
3. Run the script by executing the following command:

   ```bash
   ./build.sh
   ```

### What it does:
- Enters the `service` directory and performs the necessary build operations for that component.
- Goes back to the project's root directory.
- Enters the `react-app` directory and runs the build process for the React application.
- Copies and organizes files as needed to create the final project structure.
- Cleans up any unnecessary or temporary files.

After running the script, you should have a fully built project ready under: `extension`, please import it using `manifest.json`.

