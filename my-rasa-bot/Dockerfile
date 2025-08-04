# Use the correct base image for the full Rasa server
FROM rasa/rasa:3.6.14-full

# Set the working directory inside the server to /app.
WORKDIR /app

# Use the --chown flag to set file ownership during the COPY step
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

# --- FIX: Use the more robust "exec form" for the CMD instruction ---
# This prevents the shell from misinterpreting the command arguments.
# We use port 10000 directly, which is what Render expects.
CMD ["run", "--port", "10000", "--enable-api", "--cors", "*"]

