import styles from './Container.module.scss';

export const Container = ({ className, children }) => {
    return <div className={`${styles.container} ${className}`}>
      {children}
    </div>
}