# Use the correct base image for the full Rasa server
FROM rasa/rasa:3.6.14-full

# Set the working directory inside the server to /app.
WORKDIR /app

# Copy your local Rasa files into the server's /app directory.
COPY ./data /app/data
COPY ./actions /app/actions
COPY config.yml domain.yml credentials.yml endpoints.yml /app/

# --- FIX: Change ownership of all files in /app to the standard user ---
# This gives the user permission to write to the files during training.
RUN chown -R 1001:1001 /app

# Temporarily switch to the root user to install dependencies.
USER root

# If you have any custom Python packages for your actions, this will install them.
RUN if [ -f /app/actions/requirements.txt ]; then \
      pip install -r /app/actions/requirements.txt; \
    fi

# Switch back to a standard user for security.
USER 1001

# This is a key step: It trains your Rasa model when the server is being built.
RUN rasa train --force

# This is the final command that runs when the server starts.
# It starts your Rasa chatbot and makes it available to the internet.
CMD ["run", "-p", "5005", "--enable-api", "--cors", "*"]
