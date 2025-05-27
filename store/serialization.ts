// 持久化相关
export const serialize = (state: any) => {
  return JSON.stringify({
    ...state,
    state: {
      ...state.state,
      notes: state.state.notes.map((note: any) => ({
        ...note,
        createdAt: note.createdAt.toISOString(),
      })),
      recentDeletedNotes: state.state.recentDeletedNotes.map((note: any) => ({
        ...note,
        createdAt: note.createdAt.toISOString(),
        deletedAt: note.deletedAt.toISOString(),
      })),
    },
  });
};

export const deserialize = (str: string) => {
  try {
    const parsed = JSON.parse(str);
    return {
      ...parsed,
      state: {
        ...parsed.state,
        notes: parsed.state.notes.map((note: any) => ({
          ...note,
          createdAt: new Date(note.createdAt),
        })),
        recentDeletedNotes: (parsed.state.recentDeletedNotes || []).map(
          (note: any) => ({
            ...note,
            createdAt: new Date(note.createdAt),
            deletedAt: new Date(note.deletedAt),
          })
        ),
        // 重置编辑器状态
        isEditorOpen: false,
        selectedNote: null,
      },
    };
  } catch (error) {
    console.error("JSON解析失败:", error);
    return {
      state: {
        notes: [],
        recentDeletedNotes: [],
        isEditorOpen: false,
        selectedNote: null,
      },
    };
  }
};