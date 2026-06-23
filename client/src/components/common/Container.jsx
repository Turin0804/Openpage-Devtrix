/* eslint-disable react/prop-types */
const Container = ({ children }) => {
    return (
        <div className="max-w-screen-xl mx-auto px-4 lg:px-0 py-12">
            {children}
        </div>
    );
};

export default Container;
