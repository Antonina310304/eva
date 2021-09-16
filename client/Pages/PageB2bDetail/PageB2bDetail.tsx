import React, { FC, HTMLAttributes, memo, useState, useCallback, useMemo } from 'react';
import cn from 'classnames';

import Button from '@UI/Button';
import FeedbackForm from '@Forms/FeedbackForm';
import PressGallery from '@Components/PressGallery';
import Project from './elements/Project';
import { PageB2bDetailData, ProjectItem } from './typings';
import styles from './PageB2bDetail.module.css';

export interface PageB2bDetailProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  page: PageB2bDetailData;
}

const PageB2bDetail: FC<PageB2bDetailProps> = (props) => {
  const { className, page, ...restProps } = props;
  const { title, teaser, examples, articles, projects } = page;
  const [visibleItems, setVisibleItems] = useState(examples.length > 3 ? 3 : examples.length);

  const uniqueProjects: ProjectItem[] = useMemo(() => {
    const projectsMap = {};
    examples.forEach((example) => {
      if (!projectsMap[example.projectId]) {
        projectsMap[example.projectId] = example;
      }
    });

    return Object.values(projectsMap);
  }, [examples]);

  const visibleProjects = useMemo(() => uniqueProjects.slice(0, visibleItems), [
    uniqueProjects,
    visibleItems,
  ]);

  const handleClickMore = useCallback(() => {
    setVisibleItems(visibleItems + 3);
  }, [visibleItems]);

  const balance = uniqueProjects.length - visibleItems;

  return (
    <div {...restProps} className={cn(styles.page, className)}>
      <h1 className={styles.heading}>{title}</h1>
      <div className={styles.teaserWrapper}>
        <div className={styles.teaser}>{teaser}</div>
      </div>
      <h2 className={styles.subheading}>{projects.title}</h2>
      {visibleProjects.map((project) => (
        <div className={styles.contentWrapper} key={project.projectId}>
          <Project
            examples={examples.filter((example) => example.projectId === project.projectId)}
            project={project}
          />
          <div className={styles.descriptionWrapper}>
            <h3 className={styles.projectName}>{project.title}</h3>
            <div className={styles.textWrapper}>
              {project.text.map((elem, elemIndex: number) => (
                <div className={styles.description} key={elemIndex}>
                  {elem}
                </div>
              ))}
            </div>
          </div>
        </div>
      ))}

      {balance > 0 && (
        <div className={styles.buttonWrapper}>
          <Button className={styles.button} type='button' theme='dirty' onClick={handleClickMore}>
            {`Смотреть еще ${balance}`}
          </Button>
        </div>
      )}
      <FeedbackForm />
      <div className={styles.pressWrapper}>
        <PressGallery articles={articles} />
      </div>
    </div>
  );
};

export default memo(PageB2bDetail);
