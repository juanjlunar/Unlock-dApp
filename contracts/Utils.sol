pragma solidity >=0.4.0 <0.7.0;

library Utils {

    function getFileObject(
        string memory _fileLink,
        uint _goal,
        string memory _title,
        string memory _description,
        uint _donated,
        uint _dateCreated
    ) internal pure returns(string memory content) {
        content = string(abi.encodePacked(
            '{"fileLink": ', '"', _fileLink, '"',
            ', "goal": ', '"', toString(_goal), '"',
            ', "title": ', '"', _title, '"',
            ', "description": ', '"', _description, '"',
            ', "donated": ', '"', toString(_donated), '"',
            ', "dateCreated": ', '"', toString(_dateCreated), '"',
            '}')
        );
    }
    function toString(uint _i) internal pure returns (string memory _uintAsString) {
        if (_i == 0) {
            return "0";
        }
        uint j = _i;
        uint len;
        while (j != 0) {
            len++;
            j /= 10;
        }
        bytes memory bstr = new bytes(len);
        uint k = len - 1;
        j = _i;

        while (j != 0) {
            bstr[k--] = byte(uint8(48 + j % 10));
            j /= 10;
        }
        return string(bstr);
    }
}