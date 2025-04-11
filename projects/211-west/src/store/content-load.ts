import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';

export type ContentLoadState = {
  loading: boolean;
  contentLoadRunning: boolean;
  totalToDownload: number | null;
  totalToDownloadSize: number | null;
  totalDownloaded: number | null;
  totalDownloadedSize: number | null;
};

export type ContentLoadActions = {
  setLoading(loading: boolean): void;
  setContentLoadRunning(contentLoadRunning: boolean): void;
  setTotalToDownload(totalToDownload: number | null): void;
  setTotalToDownloadSize(totalToDownloadSize: number | null): void;
  setTotalDownloaded(totalDownloaded: number | null): void;
  addTotalDownloaded(iteration?: number): void;
  setTotalDownloadedSize(totalDownloadedSize: number | null): void;
  addTotalDownloadedSize(size: number): void;
};

export const useContentLoadStore = create(
  immer<ContentLoadState & ContentLoadActions>((set) => ({
    loading: true,
    contentLoadRunning: true,
    totalToDownload: null,
    totalToDownloadSize: null,
    totalDownloaded: null,
    totalDownloadedSize: null,

    setLoading(loading) {
      set((state) => {
        state.loading = loading;
      });
    },
    setContentLoadRunning(contentLoadRunning) {
      set((state) => {
        state.contentLoadRunning = contentLoadRunning;
      });
    },
    setTotalToDownload(totalToDownload) {
      set((state) => {
        state.totalToDownload = totalToDownload;
      });
    },
    setTotalToDownloadSize(totalToDownloadSize) {
      set((state) => {
        state.totalToDownloadSize = totalToDownloadSize;
      });
    },
    setTotalDownloaded(totalDownloaded) {
      set((state) => {
        state.totalDownloaded = totalDownloaded;
      });
    },
    addTotalDownloaded(iteration = 1) {
      set((state) => {
        state.totalDownloaded = (state.totalDownloaded || 0) + iteration;
      });
    },
    setTotalDownloadedSize(totalDownloadedSize) {
      set((state) => {
        state.totalDownloadedSize = totalDownloadedSize;
      });
    },
    addTotalDownloadedSize(size = 0) {
      set((state) => {
        state.totalDownloadedSize = (state.totalDownloadedSize || 0) + size;
      });
    }
  }))
);

export const contentLoadState = useContentLoadStore.getState();
