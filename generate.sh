#!/bin/sh

GENERATE_ASSISTANTS=1
GENERATE_ACTIONS=1
INITIAL_ARGS=$@
SCRIPT_ARGS=""

# Loop through command arguments
while [ "$1" != "" ];
do
   case $1 in
   -a  | --assistants ) shift
                          GENERATE_ACTIONS=0
                		      ;;
   *)
    SCRIPT_ARGS="$SCRIPT_ARGS$1 "
    shift
                          ;;
    esac
done

# Generate Action pages
if [[ $GENERATE_ACTIONS -eq 1 ]]; then
  node _scripts/generate-actions.js
fi

# Generate Assistants pages
if [[ $GENERATE_ASSISTANTS -eq 1 ]]; then
  sh _scripts/generate-assistants/build.sh $SCRIPT_ARGS
fi