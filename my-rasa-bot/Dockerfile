# Start from the official Rasa SDK image.
# This image contains all the necessary dependencies for running Rasa.
FROM rasa/rasa-sdk:3.6.14

# Set the working directory inside the container.
# All subsequent commands will run from this path.
WORKDIR /app

# Copy over the essential files from your local machine to the container.
# This includes your training data, domain file, and configuration.
COPY ./data /app/data
COPY ./actions /app/actions
COPY config.yml domain.yml credentials.yml endpoints.yml /app/

# Set the user to root to have the necessary permissions for installation.
USER root

# Install any Python dependencies you have for your custom actions.
# It looks for a requirements.txt file inside your 'actions' folder.
# If you don't have any custom dependencies, this line won't do anything, which is fine.
RUN if [ -f /app/actions/requirements.txt ]; then \
      pip install -r /app/actions/requirements.txt; \
    fi

# Switch back to a non-root user for better security.
USER 1001

# Train the Rasa model when the Docker image is built.
# This ensures your chatbot is ready to go as soon as it's deployed.
# The '--force' flag ensures it retrains even if a model already exists.
RUN rasa train --force

# Set the default command to run when the container starts.
# This command starts the Rasa server and exposes it on port 5005,
# allowing your frontend to communicate with it.
CMD ["run", "-p", "5005", "--enable-api", "--cors", "*"]
