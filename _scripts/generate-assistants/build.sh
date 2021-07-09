#!/bin/sh

REL_PWD="$PWD/_scripts/generate-assistants"
REL_MODULE_BIN="$REL_PWD/node_modules"
LOCAL_ASSISTANTS_PATH=_deps/sketch-assistants
LOCAL_ASSISTANTS_OUT_PATH=pages/assistants
REL_ASSISTANTS_PACKAGES=packages
REL_ASSISTANTS_PACKAGE_UTILS=utils/src
REL_ASSISTANTS_PACKAGE_TYPES=types/src
TYPEDOC_CUSTOM_PLUGIN_NAME="typedoc-assistants-reference-markdown-plugin"
TYPEDOC_RUN_PLUGIN="$TYPEDOC_CUSTOM_PLUGIN_NAME"
# TYPEDOC_RUN_PLUGIN="typedoc-plugin-markdown"
TYPEDOC_CUSTOM_PLUGIN_SRC="$REL_PWD/$TYPEDOC_CUSTOM_PLUGIN_NAME"
TYPEDOC_CUSTOM_PLUGIN="$REL_MODULE_BIN/typedoc-assistants-reference-markdown-plugin"
TYPEDOC_CUSTOM_THEME="--theme $TYPEDOC_CUSTOM_PLUGIN/dist/theme"
# TYPEDOC_CUSTOM_THEME=""
SKIP_INSTALL=0
SKIP_FETCH=0
SKIP_FETCH_PROMPT=0
SKIP_YARN=0
SKIP_PLUGIN_BUILD=0

# Loop through command arguments
while [ "$1" != "" ];
do
   case $1 in
   -t  | --docs-only ) shift
                          SKIP_INSTALL=1
                          SKIP_FETCH=1
                		      ;;
   -NI  | --skip-install )  shift
   						            SKIP_INSTALL=1
			                    ;;
   -NF  | --skip-fetch  )  shift
                          SKIP_FETCH=1
                          ;;
   -NFP | --skip-prompt )  shift
                          SKIP_FETCH_PROMPT=1
                          ;;
   -NY | --skip-yarn ) shift
                          SKIP_YARN=1;
                          ;;
   -NP | --skip-plugin-build ) shift
                          SKIP_PLUGIN_BUILD=1;
                          ;;
   *)
    shift
                          ;;
    esac
done

if [[ $SKIP_PLUGIN_BUILD -eq 0 ]]; then
  $(cd "$TYPEDOC_CUSTOM_PLUGIN_SRC"; yarn >&2; npm run build >&2)

  if [[ $? -ne 0 ]]; then
    echo "Failed to install typedoc plugin"
    exit 1
  fi
fi


if [[ $SKIP_YARN -eq 0 ]]; then
  $(cd "$REL_PWD"; yarn >&2)
fi

TYPEDOC_BIN=`which typedoc &>/dev/null`

if [[ $? -ne 0 ]]; then

  TYPEDOC_BIN="$REL_MODULE_BIN/typedoc/bin/typedoc"

  if ! [ -x "$(command -v $TYPEDOC_BIN)" ]; then
    echo "Error: typedoc not found on system. Did you run \"npm install\"?" >&2
    exit 1
  fi

fi

# TSC_BIN=`which tsc &>/dev/null`
# if [[ $? -ne 0 ]]; then

#   TSC_BIN="$REL_MODULE_BIN/typescript/bin/tsc"

#   if ! [ -x "$(command -v $TYPEDOC_BIN)" ]; then
#     echo "Error: tsc not found on system. Did you run \"npm install\"?" >&2
#     exit 1
#   fi

# fi

if [[ $SKIP_FETCH -eq 0 ]]; then
  if [[ $SKIP_FETCH_PROMPT -eq 0 ]]; then
    read -e -p "Enter path for sketch-assistants repo (or empty for git clone):" ASSISTANTS_PATH

    ASSISTANTS_PATH=${ASSISTANTS_PATH:-$LOCAL_ASSISTANTS_PATH}
  else
    ASSISTANTS_PATH="$LOCAL_ASSISTANTS_PATH"
  fi

  if [[ ! -d $ASSISTANTS_PATH ]]; then

    git clone git@github.com:sketch-hq/sketch-assistants.git $ASSISTANTS_PATH

    if [[ $? -ne 0 ]]; then
      echo "Failed to fetch sketch-assistants repo"
      exit 1
    else
      echo "Successfully fetched sketch-assistants repo"
    fi
  else
    echo "sketch-assistants repo found. Git clone skipped."
  fi
else
  echo "Fetching sketch-assistants repo skipped"

  ASSISTANTS_PATH=$LOCAL_ASSISTANTS_PATH

  if [[ ! -d $ASSISTANTS_PATH ]]; then
    echo "Error: local assistants path not found"
    exit 1
  fi
fi

ABS_ASSISTANTS_PATH=$([[ "$ASSISTANTS_PATH" = /* ]] && echo "$ASSISTANTS_PATH" || echo "$PWD/$ASSISTANTS_PATH")
ASSISTANTS_PACKAGES=$ABS_ASSISTANTS_PATH/$REL_ASSISTANTS_PACKAGES
ASSISTANTS_PACKAGE_TYPES=$ASSISTANTS_PACKAGES/$REL_ASSISTANTS_PACKAGE_TYPES
ASSISTANTS_PACKAGE_UTILS=$ASSISTANTS_PACKAGES/$REL_ASSISTANTS_PACKAGE_UTILS

ABS_ASSISTANTS_PKGS=$([[ "$ASSISTANTS_PACKAGES" = /* ]] && echo "$ASSISTANTS_PACKAGES" || echo "$PWD/$ASSISTANTS_PACKAGES")
ABS_ASSISTANTS_PKG_TYPES=$([[ "$ASSISTANTS_PACKAGE_TYPES" = /* ]] && echo "$ASSISTANTS_PACKAGE_TYPES" || echo "$PWD/$ASSISTANTS_PACKAGE_TYPES")
ABS_ASSISTANTS_PKG_UTILS=$([[ "$ASSISTANTS_PACKAGE_UTILS" = /* ]] && echo "$ASSISTANTS_PACKAGE_UTILS" || echo "$PWD/$ASSISTANTS_PACKAGE_UTILS")

if [[ $SKIP_INSTALL -eq 0 ]]; then
  echo "Installing sketch-assistants dependency ..."

  CMD_YARN="yarn"
  CMD_NPM="npm install"
  CMD_YARN_BUILD="yarn build"

  INSTALL_RESULT=$(cd "$ABS_ASSISTANTS_PATH"; $CMD_NPM >&2)
  if [[ $? -ne 0 ]]; then
    echo "Failed to install sketch-assistants"
    exit 1
  fi

  # Install packages
  echo "Installing sketch-assistants types..."
  $(cd "$ABS_ASSISTANTS_PKG_TYPES"; npm install >&2)
  if [[ $? -ne 0 ]]; then
    echo "Failed to install sketch-assistants/packages/types"
    exit 1
  fi

  echo "Installing sketch-assistants utils..."
  $(cd "$ABS_ASSISTANTS_PKG_UTILS"; npm install >&2)
  if [[ $? -ne 0 ]]; then
    echo "Failed to install sketch-assistants/packages/utils"
    exit 1
  fi

  echo "Building yarn packages workspaces"
  $(cd "$ABS_ASSISTANTS_PATH"; yarn install >&2; sh build.sh >&2)
  if [[ $? -ne 0 ]]; then
    echo "Failed to build yarn workspaces"
    exit 1
  fi

  echo "Successfully installed sketch-assistants dependency"
else
  echo "Skipped installing sketch-assistants dependency"
fi

echo "Generating TypeDoc documentation ..."

if [[ -d $LOCAL_ASSISTANTS_OUT_PATH ]]; then
  rm -rf $LOCAL_ASSISTANTS_OUT_PATH
fi

ABS_LOCAL_ASSISTANTS_OUT=$([[ "$LOCAL_ASSISTANTS_OUT_PATH" = /* ]] && echo "$LOCAL_ASSISTANTS_OUT_PATH" || echo "$PWD/$LOCAL_ASSISTANTS_OUT_PATH")

TYPEDOC_PARAMS="$TYPEDOC_CUSTOM_THEME --readme none --plugin $TYPEDOC_RUN_PLUGIN --excludeExternals --exclude **/__tests__/*"

CMD_TYPEDOC_PACKAGE_TYPES="$TYPEDOC_BIN $TYPEDOC_PARAMS --name Types --entryDocument types.md --out $ABS_LOCAL_ASSISTANTS_OUT $ABS_ASSISTANTS_PKG_TYPES"
CMD_TYPEDOC_PACKAGE_UTILS="$TYPEDOC_BIN $TYPEDOC_PARAMS --name Utils --entryDocument utils.md --out $ABS_LOCAL_ASSISTANTS_OUT $ABS_ASSISTANTS_PKG_UTILS --disableOutputCheck"

$(cd "$ABS_ASSISTANTS_PATH"; $CMD_TYPEDOC_PACKAGE_TYPES >&2)
$(cd "$ABS_ASSISTANTS_PATH"; $CMD_TYPEDOC_PACKAGE_UTILS >&2)

# CMD_TYPEDOC_PACKAGES="$TYPEDOC_BIN $TYPEDOC_PARAMS --exclude cli/**/* --out $ABS_LOCAL_ASSISTANTS_OUT $ABS_ASSISTANTS_PKGS"
# $(cd "$ABS_ASSISTANTS_PATH"; $CMD_TYPEDOC_PACKAGES >&2)


