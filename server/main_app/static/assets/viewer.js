{/* <script type="text/babel">

    class Post extends React.Component {
        constructor(props){
            super(props);
        }
        render(){
        return(
            <div className="post">
                <LazyLoad
                    once={true}
                    placeholder={<img src={`https://picsum.photos/id/${this.props.id}/5/5`} alt="..." />}
                >
                    <div className="post-img">
                        <img src={`https://picsum.photos/id/${this.props.id}/1000/1000`} alt="..." />
                    </div>
                </LazyLoad>
                <div className="post-body">
                    <h4>{this.props.title}</h4>
                    <p>{this.props.body}</p>
                </div>
            </div>
        );
        }
    }

    class Spinner extends React.Component {
            constructor(props) {
                super(props);
            }
            render() {
                return (
                    <div className="post loading">
                        <svg
                            width="80"
                            height="80"
                            viewBox="0 0 100 100"
                            preserveAspectRatio="xMidYMid"
                        >
                            <circle
                                cx="50"
                                cy="50"
                                fill="none"
                                stroke="#49d1e0"
                                strokeWidth="10"
                                r="35"
                                strokeDasharray="164.93361431346415 56.97787143782138"
                                transform="rotate(275.845 50 50)"
                            >
                                <animateTransform
                                    attributeName="transform"
                                    type="rotate"
                                    calcMode="linear"
                                    values="0 50 50;360 50 50"
                                    keyTimes="0;1"
                                    dur="1s"
                                    begin="0s"
                                    repeatCount="indefinite"
                                />
                            </circle>
                        </svg>
                    </div>
                );
            }
        }

        class ThumbViewComp extends React.Component {
                constructor(props) {
                    super(props);
                    console.log("Hello");
                }

                render() {

                    return (
                        <div className="App">
                            <h2>LazyLoad Demo</h2>
                            <div className="post-container">
                                 {data.map(post => (
                                    <LazyLoad
                                        key={post.id}
                                        height={100}
                                        offset={[-100, 100]}
                                        placeholder={<Spinner />}
                                    >
                                        <Post key={post.id} id={post.id} title={post.title} body={post.body}  />
                                    </LazyLoad>
                                ))}
                            </div>
                        </div>
                    );
                }
            }
        ReactDOM.render(
            <ThumbViewComp/>,
            document.getElementById('root')
        );

    </script> */}