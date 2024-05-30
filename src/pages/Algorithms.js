import React from 'react';
import AlgorithmExplanation from "../components/AlgorithmExplanation";

const Algorithms = () => {
    return (<div className={"container"}>
        {/*<h1>Algorithms</h1>*/}
        {/*<p>This is the Algorithms page.</p>*/}
        <div className={"row"}>
            <div className={"col-md-6"}>
                <AlgorithmExplanation algorithmName={"Algorithm 1"}
                                      shortName={"alg1"}
                                      desc={"Nunc vel elit et quam feugiat auctor eu vitae ex. Aenean sollicitudin, arcu non porta efficitur, purus enim interdum lacus, ac dictum erat erat vitae urna. Donec tortor eros, dapibus cursus consequat ac, facilisis in risus. Pellentesque eget massa pharetra, faucibus augue at, cursus urna. Proin sagittis sed nulla non sodales. Cras turpis lacus, vestibulum cursus tristique quis, lacinia non magna. Vivamus aliquam ex nec semper porta. In id odio at ante maximus tempus. Nunc et sapien et justo aliquet bibendum et quis lectus. In id semper sapien. In quis posuere lectus. Integer porttitor tellus nisi, nec mollis dolor viverra sed."}/>
            </div>
            <div className={"col-md-6"}>
                <AlgorithmExplanation algorithmName={"Algorithm 2"}
                                      shortName={"alg2"}
                                      desc={"Aliquam auctor ac nunc sit amet ullamcorper. Vestibulum sit amet metus rhoncus, gravida nulla ac, euismod massa. Fusce interdum fermentum ultricies. Ut nisi sapien, sodales vitae feugiat volutpat, dignissim a augue. Vestibulum sit amet ipsum venenatis nisl tempus scelerisque. Aliquam malesuada, lectus ut scelerisque scelerisque, purus lacus venenatis est, sit amet malesuada nisl risus eget massa. Interdum et malesuada fames ac ante ipsum primis in faucibus. Pellentesque at tellus ut nunc sollicitudin iaculis a at metus. Vestibulum viverra maximus lacus vitae sagittis. Nulla lacinia, magna sit amet viverra vehicula, enim enim maximus neque, sed volutpat lorem felis sit amet turpis."}/>
            </div>
        </div>
        <div className={"row mt-4 mb-4"}>
            <div className={"col-md-6"}>
                <AlgorithmExplanation algorithmName={"Algorithm 3"}
                                      shortName={"alg3"}
                                      desc={"Suspendisse ac volutpat odio, a elementum est. Vestibulum commodo neque in feugiat lobortis. Curabitur molestie pulvinar diam, non auctor turpis dictum vel. Vivamus semper felis ac congue varius. Aenean ultricies urna vel accumsan dictum. Maecenas ac mauris et neque laoreet volutpat. Fusce sem dui, eleifend sit amet sapien sit amet, bibendum cursus mi. Nam blandit vitae risus at placerat. Pellentesque facilisis dictum orci molestie placerat."}/>
            </div>
            <div className={"col-md-6"}>
                <AlgorithmExplanation algorithmName={"Algorithm 4"}
                                      shortName={"alg4"}
                                      desc={"Interdum et malesuada fames ac ante ipsum primis in faucibus. Quisque convallis fringilla sem, et tempus orci cursus sit amet. Pellentesque eget tortor a lacus vehicula elementum at sit amet nunc. Proin ut magna non nulla fermentum hendrerit. Fusce interdum velit ante, in placerat nisl auctor quis. Aliquam velit leo, aliquet a bibendum ac, facilisis sit amet leo. Proin vulputate lacinia suscipit. Vestibulum tristique volutpat rutrum. Nunc eu nibh ultricies tellus dictum lobortis ut non nibh. "}/>
            </div>
        </div>

    </div>);
};

export default Algorithms;
