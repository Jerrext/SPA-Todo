import React from 'react';
import styles from './PageContainer.module.scss';
import { Outlet } from 'react-router-dom';
import { ModalWindowType } from 'src/utils/@globalTypes';
import CreateProjectWindow from 'src/components/ModalWindow/CreateProjectWindow/CreateProjectWindow';
import { useTypedSelector } from 'src/utils/hooks';
import {
  PageSelectors,
  ProjectsSelectors,
  TasksSelectors,
} from 'src/redux/selectors/selectors';
import CreateTaskWindow from 'src/components/ModalWindow/CreateTaskWindow/CreateTaskWindow';
import TaskInfoWindow from 'src/components/ModalWindow/TaskInfoWindow/TaskInfoWindow';
import SubtaskInfoWindow from 'src/components/ModalWindow/SubtaskInfoWindow/SubtaskInfoWindow';
import CreateSubtaskWindow from 'src/components/ModalWindow/CreateSubtaskWindow/CreateSubtaskWindow';

const PageContainer = () => {
  const modalWindowType = useTypedSelector(PageSelectors.getModalWindowType);
  const currentProject = useTypedSelector(ProjectsSelectors.getCurrentProject);
  // const taskStatusOptions = useTypedSelector(TasksSelectors.getTaskStatusOptions);
  const priorityOptions = useTypedSelector(TasksSelectors.getPriorityOptions);
  const taskNum = useTypedSelector(TasksSelectors.getTaskNum);
  const currentTask = useTypedSelector(TasksSelectors.getCurrentTask);
  const currentSubtask = useTypedSelector(TasksSelectors.getCurrentSubtask);
  const statusOptions = useTypedSelector(TasksSelectors.getTaskStatusOptions);
  const priorities = useTypedSelector(TasksSelectors.getPriorities);
  const statuses = useTypedSelector(TasksSelectors.getStatuses);

  const getCurrentWindow = () => {
    switch (modalWindowType) {
      case ModalWindowType.CreateProject:
        return <CreateProjectWindow currentProject={null} />;
      case ModalWindowType.EditProject:
        return <CreateProjectWindow currentProject={currentProject} />;
      case ModalWindowType.CreateTask:
        return (
          <CreateTaskWindow
            currentProjectId={currentProject?.id}
            taskNum={taskNum}
            priorityOptions={priorityOptions}
          />
        );
      case ModalWindowType.CreateSubtask:
        return (
          <CreateSubtaskWindow
            currentTask={currentTask}
            priorityOptions={priorityOptions}
          />
        );
      case ModalWindowType.TaskInfo:
        return (
          <TaskInfoWindow
            priorities={priorities}
            statusOptions={statusOptions}
            currentTask={currentTask}
            priorityOptions={priorityOptions}
            statuses={statuses}
          />
        );
      case ModalWindowType.SubtaskInfo:
        return (
          <SubtaskInfoWindow
            priorities={priorities}
            statusOptions={statusOptions}
            currentSubtask={currentSubtask}
            currentTask={currentTask}
            priorityOptions={priorityOptions}
            statuses={statuses}
          />
        );
      default:
        return;
    }
  };
  return (
    <div className={styles.container}>
      <Outlet />
      {getCurrentWindow()}
    </div>
  );
};

export default PageContainer;
