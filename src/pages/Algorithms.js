import React from 'react';
import AlgorithmExplanation from "../components/algorithm/AlgorithmExplanation";

const Algorithms = () => {
    return (<div className={"container"}>
        <div className={"row"}>
            <div className={"col-12 col-md-6"}>
                <AlgorithmExplanation algorithmTitle={"HLFET Algorithm"}
                                      algorithmName={"hlfet"}
                                      desc={"\n" +
                                          "The Highest Level First with Estimated Time (HLFET) algorithm is a static scheduling method used in parallel processing to efficiently allocate tasks to multiple processors. The algorithm prioritises tasks based on their static level (SL), which is calculated as the execution time of a task plus the maximum SL of its successors. Tasks are sorted in descending order of their SL, ensuring that higher-priority tasks are scheduled first. HLFET then assigns each task to the processor that allows the earliest possible start time, aiming to minimise the overall completion time and balance the load among processors. "}/>
            </div>
            <div className={"col-12 col-md-6"}>
                <AlgorithmExplanation algorithmTitle={"MCP Algorithm"}
                                      algorithmName={"mcp"}
                                      desc={"Aliquam auctor ac nunc sit amet ullamcorper. Vestibulum sit amet metus rhoncus, gravida nulla ac, euismod massa. Fusce interdum fermentum ultricies. Ut nisi sapien, sodales vitae feugiat volutpat, dignissim a augue. Vestibulum sit amet ipsum venenatis nisl tempus scelerisque. Aliquam malesuada, lectus ut scelerisque scelerisque, purus lacus venenatis est, sit amet malesuada nisl risus eget massa. Interdum et malesuada fames ac ante ipsum primis in faucibus. Pellentesque at tellus ut nunc sollicitudin iaculis a at metus. Vestibulum viverra maximus lacus vitae sagittis. Nulla lacinia, magna sit amet viverra vehicula, enim enim maximus neque, sed volutpat lorem felis sit amet turpis."}/>
            </div>
        </div>
        <div className={"row mt-4 mb-4"}>
            <div className={"col-12 col-md-6"}>
                <AlgorithmExplanation algorithmTitle={"ETF Algorithm"}
                                      algorithmName={"etf"}
                                      desc={"Suspendisse ac volutpat odio, a elementum est. Vestibulum commodo neque in feugiat lobortis. Curabitur molestie pulvinar diam, non auctor turpis dictum vel. Vivamus semper felis ac congue varius. Aenean ultricies urna vel accumsan dictum. Maecenas ac mauris et neque laoreet volutpat. Fusce sem dui, eleifend sit amet sapien sit amet, bibendum cursus mi. Nam blandit vitae risus at placerat. Pellentesque facilisis dictum orci molestie placerat."}/>
            </div>
            <div className={"col-12 col-md-6"}>
                <AlgorithmExplanation algorithmTitle={"DLS Algorithm"}
                                      algorithmName={"dls"}
                                      desc={"Interdum et malesuada fames ac ante ipsum primis in faucibus. Quisque convallis fringilla sem, et tempus orci cursus sit amet. Pellentesque eget tortor a lacus vehicula elementum at sit amet nunc. Proin ut magna non nulla fermentum hendrerit. Fusce interdum velit ante, in placerat nisl auctor quis. Aliquam velit leo, aliquet a bibendum ac, facilisis sit amet leo. Proin vulputate lacinia suscipit. Vestibulum tristique volutpat rutrum. Nunc eu nibh ultricies tellus dictum lobortis ut non nibh. "}/>
            </div>
        </div>

    </div>);
};

export default Algorithms;
