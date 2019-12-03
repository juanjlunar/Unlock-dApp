pragma solidity ^0.5.11;
import './IterableMapping.sol';
import './Utils.sol';


contract FileShare {
    IterableMapping.file filesData;
    address owner = msg.sender;

    modifier doesIndexExist(uint _index) {
        require(
            IterableMapping.contains(filesData, _index) == true,
            'Identifier not found.'
        );
        _;
    }

    modifier required(uint _goal, string memory _fileLink, string memory _title, string memory _description) {
        require (
            bytes(_fileLink).length != 0,
            'The url field is required.'
        );
        require (
            bytes(_title).length != 0,
            'The title field is required.'
        );
        require (
            bytes(_description).length != 0,
            'The description field is required.'
        );
        require (
            _goal > 0,
            'The goal field is required and should be greater than 0.'
        );
        _;
    }

    modifier donateRules(uint _index) {
        require(
            msg.value > 0,
            'The minimum value should be greater than 0.'
        );
        _;
    }

    modifier withdrawRules(uint _index) {
        require(
            IterableMapping.hasFunds(filesData, _index) == true,
            'No funds to withdraw.'
        );
        _;
    }

    modifier isFileOwner(uint _index) {
        require(
            IterableMapping.isFileOwner(filesData, _index, msg.sender) == true,
            'Unauthorized.'
        );
        _;
    }

    function storeFile(
        uint _goal,
        string memory _fileLink,
        string memory _title,
        string memory _description
    )
        public
        required(
            _goal,
            _fileLink,
            _title,
            _description
        )
        returns(uint)
    {
        IterableMapping.insert(filesData, _goal, _fileLink, _title, _description, msg.sender);
        return filesData.size;
    }

    function getFileInfo(uint _index) public view doesIndexExist(_index) returns(string memory) {
        (
            , uint goal,
            string memory fileLink,
            string memory title,
            string memory description,
            ,
            uint donated,
            uint dateCreated,
        ) = IterableMapping.get(filesData, _index);
        return string(abi.encodePacked(
            '"',
            Utils.getFileObject(donated >= goal ? fileLink : 'File hidden until goal is reached as minimum.', goal, title, description, donated, dateCreated),
            '"'
        ));
    }

    function getAllFilesInfo() public view returns(string memory content) {
        content = '"[';
        for (uint i = IterableMapping.firstIndex(filesData);
        IterableMapping.isValid(filesData, i);
        i = IterableMapping.nextIndex(filesData, i)) {
            (
                ,
                uint goal,
                string memory fileLink,
                string memory title,
                string memory description,
                ,
                uint donated,
                uint dateCreated,
            ) = IterableMapping.get(filesData, i);

            content = string(abi.encodePacked(
                content,
                Utils.getFileObject(donated >= goal ? fileLink : 'File hidden until goal is reached as minimum.',
                goal,
                title,
                description,
                donated,
                dateCreated),
                (i == filesData.size) ? '' : ', '
            ));
        }
        content = string(abi.encodePacked(content, ']"'));
    }

    function donate(uint _index) public payable donateRules(_index) doesIndexExist(_index) returns(uint) {
        return IterableMapping.donate(filesData, _index, msg.value);
    }

    function withdraw(uint _index) public payable
    doesIndexExist(_index)
    withdrawRules(_index)
    isFileOwner(_index)
    returns(bool) {
        (
            ,
            ,
            ,
            ,
            ,
            ,
            uint donated,
            ,
        ) = IterableMapping.get(filesData, _index);
        msg.sender.transfer(donated);
        return IterableMapping.resetDonated(filesData, _index);
    }
    function getAvailableFunds(uint _index) public view
    doesIndexExist(_index)
    withdrawRules(_index)
    isFileOwner(_index)
    returns (uint) {
        (
            ,
            ,
            ,
            ,
            ,
            ,
            uint donated,
            ,
        ) = IterableMapping.get(filesData, _index);
        return donated;
    }
}