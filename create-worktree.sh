#!/bin/bash
if [ $# -eq 0 ]; then
    echo "Error: 워크트리 이름을 입력해주세요!"
    exit 1
fi

ARGUMENT=$1
WORKTREE_PATH="../worktree/$ARGUMENT"

# 워크트리가 이미 존재하면 재사용, 없으면 새로 생성
if [ -d "$WORKTREE_PATH" ]; then
    echo "기존 워크트리 재사용: $WORKTREE_PATH"
else
    if ! git worktree add "$WORKTREE_PATH"; then
        echo "워크트리 생성에 실패했습니다."
        exit 1
    fi
    echo "워크트리 생성 성공: $WORKTREE_PATH"
fi

# .env.local을 워크트리에 복사 (gitignore 파일이라 자동 복사 안 됨)
SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
if [ -f "$SCRIPT_DIR/.env.local" ]; then
    cp "$SCRIPT_DIR/.env.local" "$WORKTREE_PATH/.env.local"
    echo ".env.local 복사 완료"
else
    echo "경고: .env.local 파일을 찾을 수 없습니다 ($SCRIPT_DIR/.env.local)"
fi

cd "$WORKTREE_PATH" || exit 1
echo "디렉터리 변경 완료: $(pwd)"
claude