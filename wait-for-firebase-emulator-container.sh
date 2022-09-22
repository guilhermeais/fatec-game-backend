echo "Waiting for firebase emulator container to start..."
until [ "`docker inspect -f {{.State.Running}} firebase-emulator-container`"=="true" ]; do
    sleep 0.1;
done;
echo "Firebase emulator container started!"
