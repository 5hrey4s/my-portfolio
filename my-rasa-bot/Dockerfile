# Use the correct base image for the full Rasa server
FROM rasa/rasa:3.6.14-full

# Set the working directory inside the server to /app.
WORKDIR /app

# --- FIX: Use the --chown flag to set file ownership during the COPY step ---
# This is a cleaner and more reliable way to handle permissions.
COPY --chown=1001:1001 ./data /app/data
COPY --chown=1001:1001 ./actions /app/actions
COPY --chown=1001:1001 config.yml domain.yml credentials.yml endpoints.yml /app/

# Switch to the root user ONLY to install Python dependencies if they exist.
USER root
RUN if [ -f /app/actions/requirements.txt ]; then \
      pip install -r /app/actions/requirements.txt; \
    fi

# Switch to the final, non-root user for all subsequent operations.
USER 1001

# Now, as the file owner, train the Rasa model.
RUN rasa train --force

# This is the final command that runs when the server starts.
CMD ["run", "-p", "5005", "--enable-api", "--cors", "*"]
