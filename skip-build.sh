#!/bin/bash

echo "VERCEL_GIT_COMMIT_MESSAGE: $VERCEL_GIT_COMMIT_MESSAGE"

if [[ "$VERCEL_GIT_COMMIT_MESSAGE" != *"[skip build]"* ]] ; then
  # Proceed with the build
  exit 1;

else
  # Don't proceed with the build
  echo "🛑 - Ignored build step"
  exit 0;
fi